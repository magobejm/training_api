import { ITrainingRepository } from '../domain/training.repository';
import { TrainingDay } from '../domain/training-day.entity';
export declare class AddDayToPlanUseCase {
    private readonly trainingRepository;
    constructor(trainingRepository: ITrainingRepository);
    execute(command: {
        planId: string;
        name: string;
        order: number;
        userId: string;
    }): Promise<TrainingDay>;
}
