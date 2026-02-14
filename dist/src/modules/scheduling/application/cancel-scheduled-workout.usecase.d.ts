import { ISchedulingRepository } from '../domain/scheduling.repository';
export declare class CancelScheduledWorkoutUseCase {
    private readonly repository;
    constructor(repository: ISchedulingRepository);
    execute(command: {
        scheduledWorkoutId: string;
        userId: string;
    }): Promise<void>;
}
