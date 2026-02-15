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
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    }
                },
                trainingDay: {
                    select: {
                        name: true,
                        plan: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return workout ? this.mapToDomain(workout) : null;
    }

    async findUpcoming(
        userId: string,
        filters?: {
            startDate?: Date;
            endDate?: Date;
            trainerId?: string;
        },
    ): Promise<ScheduledWorkout[]> {
        const whereClause: any = {
            OR: [
                { userId }, // The user is the client
            ],
        };

        if (filters?.trainerId) {
            whereClause.OR.push({ trainerId: filters.trainerId });
        }

        // Apply date filters to both conditions implicitly by adding them to the top-level AND (which Prisma does by default when mixing top-level props)
        // However, we need to be careful with OR.
        // We want: (userId = X OR trainerId = Y) AND (date >= start AND date <= end)

        // Prisma structure:
        // where: {
        //   OR: [ ... ],
        //   scheduledFor: { ... }
        // }

        const dateFilter: any = {};
        if (filters?.startDate) {
            dateFilter.gte = filters.startDate;
        }
        if (filters?.endDate) {
            dateFilter.lte = filters.endDate;
        }

        const workouts = await this.prisma.scheduledWorkout.findMany({
            where: {
                ...whereClause,
                ...(Object.keys(dateFilter).length > 0 && {
                    scheduledFor: dateFilter,
                }),
            },
            orderBy: {
                scheduledFor: 'asc',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        avatarUrl: true,
                    }
                },
                trainingDay: {
                    select: {
                        name: true,
                        plan: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        // Mapping needs to be adjusted if we want to include user/day info in the future,
        // but for now mapToDomain only maps the base entity fields.
        // The Domain Entity doesn't seem to have clientName yet, but let's check.
        // For now, standard mapping.

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

    async hasOverlap(userId: string, scheduledFor: Date, excludeId?: string): Promise<boolean> {
        // Simple overlap check: exact same time for the same user
        // We could expand this to a time range if sessions had duration, but requirement says "same moment"
        const existing = await this.prisma.scheduledWorkout.findFirst({
            where: {
                userId,
                scheduledFor,
                ...(excludeId && { id: { not: excludeId } }),
            },
        });
        return !!existing;
    }

    private mapToDomain(raw: PrismaScheduledWorkout & { user?: any, trainingDay?: any }): ScheduledWorkout {
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
            // Map optional relations if present
            raw.user?.name || raw.user?.email || undefined,
            raw.trainingDay?.plan?.name || undefined,
            raw.trainingDay?.name || undefined,
        );
    }
}
