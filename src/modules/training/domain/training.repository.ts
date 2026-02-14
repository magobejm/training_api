import { TrainingPlan } from './training-plan.entity';
import { TrainingDay } from './training-day.entity';
import { DayExercise } from './day-exercise.entity';

export interface ITrainingRepository {
  createPlan(plan: TrainingPlan): Promise<TrainingPlan>;
  getPlanById(id: string): Promise<TrainingPlan | null>;
  findAll(authorId?: string): Promise<TrainingPlan[]>;
  createDay(day: TrainingDay): Promise<TrainingDay>;
  getDayById(id: string): Promise<TrainingDay | null>;
  addExerciseToDay(dayExercise: DayExercise): Promise<DayExercise>;
}

export const ITrainingRepository = Symbol('ITrainingRepository');
