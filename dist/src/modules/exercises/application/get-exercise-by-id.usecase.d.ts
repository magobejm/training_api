import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
export declare class GetExerciseByIdUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(id: string): Promise<Exercise>;
}
