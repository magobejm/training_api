import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
export declare class CreateTrainingPlanUseCase {
    private readonly trainingRepository;
    constructor(trainingRepository: ITrainingRepository);
    execute(command: {
        name: string;
        description?: string;
        authorId: string;
    }): Promise<TrainingPlan>;
}
