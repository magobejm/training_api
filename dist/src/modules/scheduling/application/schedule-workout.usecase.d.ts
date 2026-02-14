import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
export declare class ScheduleWorkoutUseCase {
    private readonly repository;
    constructor(repository: ISchedulingRepository);
    execute(command: {
        userId: string;
        trainerId: string;
        trainingDayId: string;
        scheduledFor: Date;
        notes?: string;
    }): Promise<ScheduledWorkout>;
}
