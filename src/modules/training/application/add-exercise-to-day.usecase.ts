import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { DayExercise } from '../domain/day-exercise.entity';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';

@Injectable()
export class AddExerciseToDayUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
    @Inject(IExerciseRepository)
    private readonly exerciseRepository: IExerciseRepository,
  ) { }

  async execute(command: {
    dayId: string;
    exerciseId: string;
    order: number;
    targetSets: number;
    targetReps: string;
    targetRir: number | null;
    restSeconds: number;
    customDescription?: string;
    customVideoUrl?: string;
    customImageUrl?: string;
    coachNotes?: string;
    userId: string;
  }): Promise<DayExercise> {
    const exercise = await this.exerciseRepository.findById(command.exerciseId);
    if (!exercise) {
      throw new NotFoundException(
        `Exercise with ID ${command.exerciseId} not found`,
      );
    }

    const day = await this.trainingRepository.getDayById(command.dayId);
    if (!day) {
      throw new NotFoundException(
        `Training Day with ID ${command.dayId} not found`,
      );
    }

    const plan = await this.trainingRepository.getPlanById(day.planId);
    if (!plan) {
      throw new NotFoundException(
        `Training Plan with ID ${day.planId} not found`,
      );
    }

    if (plan.authorId !== command.userId) {
      throw new ForbiddenException('You are not allowed to modify this plan');
    }

    const dayExercise = new DayExercise(
      crypto.randomUUID(),
      command.dayId,
      exercise,
      command.order,
      command.customDescription || null,
      command.customVideoUrl || null,
      command.customImageUrl || null,
      command.coachNotes || null,
      command.targetSets,
      command.targetReps,
      command.targetRir || null,
      command.restSeconds,
    );

    return this.trainingRepository.addExerciseToDay(dayExercise);
  }
}
