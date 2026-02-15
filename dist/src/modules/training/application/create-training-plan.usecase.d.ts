import { ITrainingRepository } from '../domain/training.repository';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
export declare class CreateTrainingPlanUseCase {
    private readonly trainingRepository;
    private readonly exerciseRepository;
    constructor(trainingRepository: ITrainingRepository, exerciseRepository: IExerciseRepository);
    execute(command: {
        name: string;
        description?: string;
        authorId: string;
        days?: {
            name: string;
            order: number;
            exercises?: {
                exerciseId: string;
                order: number;
                targetSets: number;
                targetReps: string;
                targetRir?: number;
                restSeconds: number;
                customDescription?: string;
                customVideoUrl?: string;
                customImageUrl?: string;
                coachNotes?: string;
            }[];
        }[];
    }): Promise<TrainingPlan>;
}
