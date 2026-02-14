import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { TrainingDay } from '../domain/training-day.entity';
import { DayExercise } from '../domain/day-exercise.entity';
import { Exercise } from '../../exercises/domain/exercise.entity';
import {
  TrainingPlan as PrismaTrainingPlan,
  TrainingDay as PrismaTrainingDay,
  DayExercise as PrismaDayExercise,
  Exercise as PrismaExercise,
} from '@prisma/client';

type FullPlan = PrismaTrainingPlan & {
  days: (PrismaTrainingDay & {
    exercises: (PrismaDayExercise & {
      exercise: PrismaExercise;
    })[];
  })[];
};

@Injectable()
export class PrismaTrainingRepository implements ITrainingRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createPlan(plan: TrainingPlan): Promise<TrainingPlan> {
    const raw = await this.prisma.trainingPlan.create({
      data: {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        authorId: plan.authorId,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
      },
      include: {
        days: {
          include: {
            exercises: {
              include: { exercise: true },
            },
          },
        },
      },
    });

    return this.mapPlanToDomain(raw);
  }

  async createDay(day: TrainingDay): Promise<TrainingDay> {
    const raw = await this.prisma.trainingDay.create({
      data: {
        id: day.id,
        name: day.name,
        order: day.order,
        planId: day.planId,
        createdAt: day.createdAt,
        updatedAt: day.updatedAt,
      },
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    });
    return this.mapDayToDomain(raw);
  }

  async getDayById(id: string): Promise<TrainingDay | null> {
    const raw = await this.prisma.trainingDay.findUnique({
      where: { id },
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    });

    if (!raw) return null;
    return this.mapDayToDomain(raw);
  }

  async addExerciseToDay(dayExercise: DayExercise): Promise<DayExercise> {
    const raw = await this.prisma.dayExercise.create({
      data: {
        id: dayExercise.id,
        dayId: dayExercise.dayId,
        exerciseId: dayExercise.exercise.id,
        order: dayExercise.order,
        targetSets: dayExercise.targetSets,
        targetReps: dayExercise.targetReps,
        targetRir: dayExercise.targetRir,
        restSeconds: dayExercise.restSeconds,
        customDescription: dayExercise.customDescription,
        customVideoUrl: dayExercise.customVideoUrl,
        customImageUrl: dayExercise.customImageUrl,
        coachNotes: dayExercise.coachNotes,
      },
      include: {
        exercise: true,
      },
    });
    return this.mapDayExerciseToDomain(raw);
  }

  async getPlanById(id: string): Promise<TrainingPlan | null> {
    const raw = await this.prisma.trainingPlan.findUnique({
      where: { id },
      include: {
        days: {
          orderBy: { order: 'asc' },
          include: {
            exercises: {
              orderBy: { order: 'asc' },
              include: { exercise: true },
            },
          },
        },
      },
    });

    if (!raw) return null;
    return this.mapPlanToDomain(raw);
  }

  async findAll(authorId?: string): Promise<TrainingPlan[]> {
    const raw = await this.prisma.trainingPlan.findMany({
      where: {
        authorId,
        deletedAt: null,
      },
      include: {
        days: {
          orderBy: { order: 'asc' },
          include: {
            exercises: {
              orderBy: { order: 'asc' },
              include: { exercise: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return raw.map((plan) => this.mapPlanToDomain(plan));
  }

  private mapPlanToDomain(raw: FullPlan): TrainingPlan {
    return new TrainingPlan(
      raw.id,
      raw.name,
      raw.description,
      raw.authorId,
      raw.days.map((d) => this.mapDayToDomain(d)),
      raw.createdAt,
      raw.updatedAt,
    );
  }

  private mapDayToDomain(
    raw: PrismaTrainingDay & {
      exercises: (PrismaDayExercise & { exercise: PrismaExercise })[];
    },
  ): TrainingDay {
    return new TrainingDay(
      raw.id,
      raw.name,
      raw.order,
      raw.planId,
      raw.exercises.map((e) => this.mapDayExerciseToDomain(e)),
      raw.createdAt,
      raw.updatedAt,
    );
  }

  private mapDayExerciseToDomain(
    raw: PrismaDayExercise & { exercise: PrismaExercise },
  ): DayExercise {
    const baseExercise = new Exercise(
      raw.exercise.id,
      raw.exercise.name,
      raw.exercise.description,
      raw.exercise.muscleGroup,
      raw.exercise.defaultVideoUrl,
      raw.exercise.defaultImageUrl,
      raw.exercise.thumbnailUrl,
      raw.exercise.createdAt,
      raw.exercise.updatedAt,
      raw.exercise.createdBy,
      raw.exercise.updatedBy,
      raw.exercise.deletedAt,
      raw.exercise.deletedBy,
    );

    return new DayExercise(
      raw.id,
      raw.dayId,
      baseExercise,
      raw.order,
      raw.customDescription,
      raw.customVideoUrl,
      raw.customImageUrl,
      raw.coachNotes,
      raw.targetSets,
      raw.targetReps,
      raw.targetRir,
      raw.restSeconds,
    );
  }
}
