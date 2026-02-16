"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTrainerStats(trainerId) {
        const [totalClients, totalExercises, totalPlans, sessionsToday] = await Promise.all([
            this.prisma.user.count({ where: { userRole: { name: 'CLIENT' }, deletedAt: null } }),
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
    async getClientStats(clientId) {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map