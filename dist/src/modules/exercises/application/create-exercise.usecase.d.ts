import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
export declare class CreateExerciseUseCase {
    private readonly exerciseRepository;
    constructor(exerciseRepository: IExerciseRepository);
    execute(command: {
        name: string;
        description: string;
        muscleGroup: string;
        videoUrl?: string;
        imageUrl?: string;
        thumbnailUrl?: string;
        userId: string;
    }): Promise<Exercise>;
}
