import { PrismaService } from '../../../prisma/prisma.service';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { TrainingDay } from '../domain/training-day.entity';
import { DayExercise } from '../domain/day-exercise.entity';
export declare class PrismaTrainingRepository implements ITrainingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlan(plan: TrainingPlan): Promise<TrainingPlan>;
    createDay(day: TrainingDay): Promise<TrainingDay>;
    getDayById(id: string): Promise<TrainingDay | null>;
    addExerciseToDay(dayExercise: DayExercise): Promise<DayExercise>;
    getPlanById(id: string): Promise<TrainingPlan | null>;
    findAll(authorId?: string): Promise<TrainingPlan[]>;
    private mapPlanToDomain;
    private mapDayToDomain;
    private mapDayExerciseToDomain;
    deletePlan(id: string): Promise<void>;
    hasScheduledWorkouts(planId: string): Promise<boolean>;
    hasActiveUsers(planId: string): Promise<boolean>;
}
