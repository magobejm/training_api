import { ScheduledWorkoutsService } from '../application/scheduled-workouts.service';
import { CreateScheduledWorkoutDto, UpdateScheduledWorkoutDto } from './scheduled-workout.dto';
import { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
export declare class ScheduledWorkoutsController {
    private readonly service;
    constructor(service: ScheduledWorkoutsService);
    create(dto: CreateScheduledWorkoutDto, user: AuthenticatedUser): Promise<{
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
    findAll(userId: string, from: string, to: string): Promise<({
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
    update(id: string, dto: UpdateScheduledWorkoutDto): Promise<{
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
