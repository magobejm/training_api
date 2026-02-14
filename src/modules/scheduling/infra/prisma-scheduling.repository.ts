import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
import { ScheduledWorkout as PrismaScheduledWorkout } from '@prisma/client';

@Injectable()
export class PrismaSchedulingRepository implements ISchedulingRepository {
    constructor(private readonly prisma: PrismaService) { }

    async scheduleWorkout(workout: ScheduledWorkout): Promise<ScheduledWorkout> {
        const created = await this.prisma.scheduledWorkout.create({
            data: {
                id: workout.id,
                userId: workout.userId,
                trainerId: workout.trainerId,
                trainingDayId: workout.trainingDayId,
                scheduledFor: workout.scheduledFor,
                reminderSent: workout.reminderSent,
                completed: workout.completed,
                notes: workout.notes,
                createdAt: workout.createdAt,
                updatedAt: workout.updatedAt,
            },
        });

        return this.mapToDomain(created);
    }

    async findById(id: string): Promise<ScheduledWorkout | null> {
        const workout = await this.prisma.scheduledWorkout.findUnique({
            where: { id },
        });

        return workout ? this.mapToDomain(workout) : null;
    }

    async findUpcoming(
        userId: string,
        filters?: {
            startDate?: Date;
            endDate?: Date;
        },
    ): Promise<ScheduledWorkout[]> {
        const workouts = await this.prisma.scheduledWorkout.findMany({
            where: {
                userId,
                ...(filters?.startDate && {
                    scheduledFor: { gte: filters.startDate },
                }),
                ...(filters?.endDate && {
                    scheduledFor: { lte: filters.endDate },
                }),
            },
            orderBy: {
                scheduledFor: 'asc',
            },
        });

        return workouts.map((w) => this.mapToDomain(w));
    }

    async updateScheduledWorkout(
        workout: ScheduledWorkout,
    ): Promise<ScheduledWorkout> {
        const updated = await this.prisma.scheduledWorkout.update({
            where: { id: workout.id },
            data: {
                scheduledFor: workout.scheduledFor,
                reminderSent: workout.reminderSent,
                completed: workout.completed,
                notes: workout.notes,
                updatedAt: workout.updatedAt,
            },
        });

        return this.mapToDomain(updated);
    }

    async deleteScheduledWorkout(id: string): Promise<void> {
        await this.prisma.scheduledWorkout.delete({
            where: { id },
        });
    }

    private mapToDomain(raw: PrismaScheduledWorkout): ScheduledWorkout {
        return new ScheduledWorkout(
            raw.id,
            raw.userId,
            raw.trainerId,
            raw.trainingDayId,
            raw.scheduledFor,
            raw.reminderSent,
            raw.completed,
            raw.notes,
            raw.createdAt,
            raw.updatedAt,
        );
    }
}
