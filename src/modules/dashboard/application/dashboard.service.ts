import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TrainerStats, ClientStats } from '../dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }

    async getTrainerStats(trainerId: string): Promise<TrainerStats> {
        const [totalClients, totalExercises, totalPlans, sessionsToday] = await Promise.all([
            this.prisma.user.count({ where: { role: 'CLIENT', deletedAt: null } }),
            this.prisma.exercise.count({ where: { deletedAt: null } }),
            this.prisma.trainingPlan.count({ where: { deletedAt: null } }),
            this.prisma.scheduledWorkout.count({
                where: {
                    scheduledFor: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                    completed: false,
                }
            })
        ]);

        return {
            totalClients,
            totalExercises,
            totalPlans,
            sessionsToday
        };
    }

    async getClientStats(clientId: string): Promise<ClientStats> {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const user = await this.prisma.user.findUnique({
            where: { id: clientId },
            include: {
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        });

        const completedWorkoutsThisMonth = await this.prisma.workoutSession.count({
            where: {
                userId: clientId,
                status: 'COMPLETED',
                completedAt: {
                    gte: startOfMonth,
                }
            }
        });

        const nextSession = await this.prisma.scheduledWorkout.findFirst({
            where: {
                userId: clientId,
                completed: false,
                scheduledFor: {
                    gte: new Date(),
                }
            },
            orderBy: {
                scheduledFor: 'asc',
            },
            take: 1,
        });

        return {
            completedWorkoutsThisMonth,
            activePlan: user?.activePlan || null,
            nextSession: nextSession ? {
                id: nextSession.id,
                date: nextSession.scheduledFor,
            } : undefined,
        };
    }
}
