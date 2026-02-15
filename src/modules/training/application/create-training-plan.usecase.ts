import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { TrainingDay } from '../domain/training-day.entity';
import { DayExercise } from '../domain/day-exercise.entity';

@Injectable()
export class CreateTrainingPlanUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
    @Inject(IExerciseRepository)
    private readonly exerciseRepository: IExerciseRepository,
  ) { }

  async execute(command: {
    name: string;
    description?: string;
    authorId: string;
    days?: {
      name: string;
      order: number;
      exercises?: {
        exerciseId: string;
        order: number;
        targetSets: number;
        targetReps: string;
        targetRir?: number;
        restSeconds: number;
        customDescription?: string;
        customVideoUrl?: string;
        customImageUrl?: string;
        coachNotes?: string;
      }[];
    }[];
  }): Promise<TrainingPlan> {
    const exerciseIds = command.days?.flatMap(d => d.exercises?.map(e => e.exerciseId) || []) || [];
    const uniqueExerciseIds = [...new Set(exerciseIds)];

    let exercisesMap = new Map();
    if (uniqueExerciseIds.length > 0) {
      const exercises = await this.exerciseRepository.findAllByIds(uniqueExerciseIds);
      if (exercises.length !== uniqueExerciseIds.length) {
        throw new NotFoundException('Some exercises were not found');
      }
      exercisesMap = new Map(exercises.map(e => [e.id, e]));
    }

    const planId = crypto.randomUUID();
    const now = new Date();

    const trainingDays = command.days?.map(dayDto => {
      const dayId = crypto.randomUUID();
      const dayExercises = dayDto.exercises?.map(exDto => {
        const exercise = exercisesMap.get(exDto.exerciseId);
        if (!exercise) throw new NotFoundException(`Exercise ${exDto.exerciseId} not found`);

        return new DayExercise(
          crypto.randomUUID(),
          dayId,
          exercise,
          exDto.order,
          exDto.customDescription || null,
          exDto.customVideoUrl || null,
          exDto.customImageUrl || null,
          exDto.coachNotes || null,
          exDto.targetSets,
          exDto.targetReps,
          exDto.targetRir || null,
          exDto.restSeconds,
        );
      }) || [];

      return new TrainingDay(
        dayId,
        dayDto.name,
        dayDto.order,
        planId,
        dayExercises,
        now,
        now,
      );
    }) || [];

    const plan = new TrainingPlan(
      planId,
      command.name,
      command.description || null,
      command.authorId,
      trainingDays,
      now,
      now,
    );

    return this.trainingRepository.createPlan(plan);
  }
}
