import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
export declare class GetExercisesUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(): Promise<Exercise[]>;
}
