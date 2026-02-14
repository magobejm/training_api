import { IExerciseRepository } from '../domain/exercise.repository';
interface DeleteExerciseInput {
    id: string;
    userId: string;
}
export declare class DeleteExerciseUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(input: DeleteExerciseInput): Promise<void>;
}
export {};
