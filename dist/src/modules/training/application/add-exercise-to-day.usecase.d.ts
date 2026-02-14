import { ITrainingRepository } from '../domain/training.repository';
import { DayExercise } from '../domain/day-exercise.entity';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
export declare class AddExerciseToDayUseCase {
    private readonly trainingRepository;
    private readonly exerciseRepository;
    constructor(trainingRepository: ITrainingRepository, exerciseRepository: IExerciseRepository);
    execute(command: {
        dayId: string;
        exerciseId: string;
        order: number;
        targetSets: number;
        targetReps: string;
        targetRir: number | null;
        restSeconds: number;
        customDescription?: string;
        customVideoUrl?: string;
        customImageUrl?: string;
        coachNotes?: string;
        userId: string;
    }): Promise<DayExercise>;
}
