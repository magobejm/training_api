import { ScheduledWorkout } from './scheduled-workout.entity';

export interface ISchedulingRepository {
    scheduleWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    findById(id: string): Promise<ScheduledWorkout | null>;
    findUpcoming(
        userId: string,
        filters?: {
            startDate?: Date;
            endDate?: Date;
            trainerId?: string;
        },
    ): Promise<ScheduledWorkout[]>;
    updateScheduledWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    deleteScheduledWorkout(id: string): Promise<void>;
    hasOverlap(userId: string, scheduledFor: Date, excludeId?: string): Promise<boolean>;
}

export const ISchedulingRepository = Symbol('ISchedulingRepository');
