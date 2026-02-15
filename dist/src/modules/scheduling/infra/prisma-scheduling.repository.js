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
exports.PrismaSchedulingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const scheduled_workout_entity_1 = require("../domain/scheduled-workout.entity");
let PrismaSchedulingRepository = class PrismaSchedulingRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async scheduleWorkout(workout) {
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
    async findById(id) {
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
    async findUpcoming(userId, filters) {
        const whereClause = {
            OR: [
                { userId },
            ],
        };
        if (filters?.trainerId) {
            whereClause.OR.push({ trainerId: filters.trainerId });
        }
        const dateFilter = {};
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
        return workouts.map((w) => this.mapToDomain(w));
    }
    async updateScheduledWorkout(workout) {
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
    async deleteScheduledWorkout(id) {
        await this.prisma.scheduledWorkout.delete({
            where: { id },
        });
    }
    async hasOverlap(userId, scheduledFor, excludeId) {
        const existing = await this.prisma.scheduledWorkout.findFirst({
            where: {
                userId,
                scheduledFor,
                ...(excludeId && { id: { not: excludeId } }),
            },
        });
        return !!existing;
    }
    mapToDomain(raw) {
        return new scheduled_workout_entity_1.ScheduledWorkout(raw.id, raw.userId, raw.trainerId, raw.trainingDayId, raw.scheduledFor, raw.reminderSent, raw.completed, raw.notes, raw.createdAt, raw.updatedAt, raw.user?.name || raw.user?.email || undefined, raw.trainingDay?.plan?.name || undefined, raw.trainingDay?.name || undefined);
    }
};
exports.PrismaSchedulingRepository = PrismaSchedulingRepository;
exports.PrismaSchedulingRepository = PrismaSchedulingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSchedulingRepository);
//# sourceMappingURL=prisma-scheduling.repository.js.map