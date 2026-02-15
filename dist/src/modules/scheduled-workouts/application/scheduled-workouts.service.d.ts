import { PrismaService } from '../../../prisma/prisma.service';
import { CreateScheduledWorkoutDto, UpdateScheduledWorkoutDto } from '../presentation/scheduled-workout.dto';
export declare class ScheduledWorkoutsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateScheduledWorkoutDto & {
        trainerId: string;
    }): Promise<{
        id: string;
        scheduledFor: Date;
        reminderSent: boolean;
        completed: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        trainerId: string;
        trainingDayId: string;
    }>;
    findAll(userId?: string, from?: Date, to?: Date): Promise<({
        user: {
            id: string;
            email: string;
            name: string | null;
            avatarUrl: string | null;
        };
        trainingDay: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            order: number;
            planId: string;
        };
    } & {
        id: string;
        scheduledFor: Date;
        reminderSent: boolean;
        completed: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        trainerId: string;
        trainingDayId: string;
    })[]>;
    update(id: string, data: UpdateScheduledWorkoutDto): Promise<{
        id: string;
        scheduledFor: Date;
        reminderSent: boolean;
        completed: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        trainerId: string;
        trainingDayId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        scheduledFor: Date;
        reminderSent: boolean;
        completed: boolean;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        trainerId: string;
        trainingDayId: string;
    }>;
}
