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
exports.ScheduledWorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ScheduledWorkoutsService = class ScheduledWorkoutsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.scheduledWorkout.create({
            data: {
                userId: data.userId,
                trainerId: data.trainerId,
                trainingDayId: data.trainingDayId,
                scheduledFor: new Date(data.scheduledFor),
                notes: data.notes,
            },
            include: {
                trainingDay: {
                    include: {
                        parentPlan: { select: { name: true } }
                    }
                },
                user: { select: { name: true, email: true, avatarUrl: true } }
            }
        });
    }
    async findAll(userId, from, to) {
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
    async update(id, data) {
        return this.prisma.scheduledWorkout.update({
            where: { id },
            data: {
                ...(data.scheduledFor && { scheduledFor: new Date(data.scheduledFor) }),
                completed: data.completed,
                notes: data.notes,
            },
        });
    }
    async remove(id) {
        return this.prisma.scheduledWorkout.delete({
            where: { id },
        });
    }
};
exports.ScheduledWorkoutsService = ScheduledWorkoutsService;
exports.ScheduledWorkoutsService = ScheduledWorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduledWorkoutsService);
//# sourceMappingURL=scheduled-workouts.service.js.map