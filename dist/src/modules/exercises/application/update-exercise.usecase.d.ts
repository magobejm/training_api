import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
interface UpdateExerciseInput {
    id: string;
    data: Partial<Exercise>;
    userId: string;
}
export declare class UpdateExerciseUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(input: UpdateExerciseInput): Promise<Exercise>;
}
export {};
