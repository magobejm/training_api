import { PrismaService } from '../../../prisma/prisma.service';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
export declare class PrismaSchedulingRepository implements ISchedulingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    scheduleWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    findById(id: string): Promise<ScheduledWorkout | null>;
    findUpcoming(userId: string, filters?: {
        startDate?: Date;
        endDate?: Date;
        trainerId?: string;
    }): Promise<ScheduledWorkout[]>;
    updateScheduledWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout>;
    deleteScheduledWorkout(id: string): Promise<void>;
    hasOverlap(userId: string, scheduledFor: Date, excludeId?: string): Promise<boolean>;
    private mapToDomain;
}
