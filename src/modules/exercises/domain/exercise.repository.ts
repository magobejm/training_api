import { Exercise } from '../domain/exercise.entity';

export interface IExerciseRepository {
  create(exercise: Exercise): Promise<Exercise>;
  findAll(userId: string): Promise<Exercise[]>;
  findById(id: string): Promise<Exercise | null>;
  update(id: string, data: Partial<Exercise>): Promise<Exercise>;
  delete(id: string): Promise<void>;
  findAllByIds(ids: string[]): Promise<Exercise[]>;
  hasDayExercises(id: string): Promise<boolean>;
  findAllMuscleGroups(): Promise<{ id: string; name: string; imageUrl: string | null }[]>;
}

export const IExerciseRepository = Symbol('IExerciseRepository');
