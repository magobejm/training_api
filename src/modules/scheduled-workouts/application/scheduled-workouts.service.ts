import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateScheduledWorkoutDto, UpdateScheduledWorkoutDto } from '../presentation/scheduled-workout.dto';

@Injectable()
export class ScheduledWorkoutsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateScheduledWorkoutDto & { trainerId: string }) {
        return this.prisma.scheduledWorkout.create({
            data: {
                userId: data.userId,
                trainerId: data.trainerId, // Or whoever created it
                trainingDayId: data.trainingDayId,
                scheduledFor: new Date(data.scheduledFor),
                notes: data.notes,
            },
            include: {
                trainingDay: {
                    include: {
                        parentPlan: { select: { name: true } } // Assuming relation exists or named differently
                    }
                },
                user: { select: { name: true, email: true, avatarUrl: true } }
            }
        });
    }

    async findAll(userId?: string, from?: Date, to?: Date) {
        return this.prisma.scheduledWorkout.findMany({
            where: {
                ...(userId && { userId }),
                scheduledFor: {
                    gte: from,
                    lte: to,
                }
            },
            include: {
                trainingDay: true,
                user: { select: { id: true, name: true, email: true, avatarUrl: true } }
            },
            orderBy: {
                scheduledFor: 'asc',
            },
        });
    }

    async update(id: string, data: UpdateScheduledWorkoutDto) {
        return this.prisma.scheduledWorkout.update({
            where: { id },
            data: {
                ...(data.scheduledFor && { scheduledFor: new Date(data.scheduledFor) }),
                completed: data.completed,
                notes: data.notes,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.scheduledWorkout.delete({
            where: { id },
        });
    }
}
