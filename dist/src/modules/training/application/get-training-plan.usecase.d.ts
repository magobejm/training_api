import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
export declare class GetTrainingPlanUseCase {
    private readonly trainingRepository;
    constructor(trainingRepository: ITrainingRepository);
    execute(id: string): Promise<TrainingPlan | null>;
}
