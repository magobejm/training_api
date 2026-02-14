import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
export declare class GetTrainingPlansUseCase {
    private readonly trainingRepository;
    constructor(trainingRepository: ITrainingRepository);
    execute(authorId?: string): Promise<TrainingPlan[]>;
}
