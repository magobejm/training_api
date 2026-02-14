import { Exercise } from '../domain/exercise.entity';
export interface IExerciseRepository {
    create(exercise: Exercise): Promise<Exercise>;
    findAll(): Promise<Exercise[]>;
    findById(id: string): Promise<Exercise | null>;
    update(id: string, data: Partial<Exercise>): Promise<Exercise>;
    delete(id: string): Promise<void>;
}
export declare const IExerciseRepository: unique symbol;
