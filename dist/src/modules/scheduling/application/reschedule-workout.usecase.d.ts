import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
export declare class RescheduleWorkoutUseCase {
    private readonly repository;
    constructor(repository: ISchedulingRepository);
    execute(command: {
        scheduledWorkoutId: string;
        newDate: Date;
        userId: string;
    }): Promise<ScheduledWorkout>;
}
