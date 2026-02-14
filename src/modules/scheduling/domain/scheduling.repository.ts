import { ScheduledWorkout } from './scheduled-workout.entity';

export interface ISchedulingRepository {
    scheduleWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    findById(id: string): Promise<ScheduledWorkout | null>;
    findUpcoming(
        userId: string,
        filters?: {
            startDate?: Date;
            endDate?: Date;
        },
    ): Promise<ScheduledWorkout[]>;
    updateScheduledWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    deleteScheduledWorkout(id: string): Promise<void>;
}

export const ISchedulingRepository = Symbol('ISchedulingRepository');
