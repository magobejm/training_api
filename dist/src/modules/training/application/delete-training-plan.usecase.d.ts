import { ITrainingRepository } from '../domain/training.repository';
interface DeleteTrainingPlanInput {
    id: string;
    userId: string;
}
export declare class DeleteTrainingPlanUseCase {
    private readonly trainingRepository;
    constructor(trainingRepository: ITrainingRepository);
    execute(input: DeleteTrainingPlanInput): Promise<void>;
}
export {};
