import { IExerciseRepository } from '../domain/exercise.repository';
export declare class GetMuscleGroupsUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(): Promise<{
        id: string;
        name: string;
        imageUrl: string | null;
    }[]>;
}
