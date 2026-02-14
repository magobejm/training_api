import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
export declare class GetUpcomingScheduleUseCase {
    private readonly repository;
    constructor(repository: ISchedulingRepository);
    execute(command: {
        userId: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<ScheduledWorkout[]>;
}
