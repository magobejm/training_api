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
exports.PrismaSessionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const workout_session_entity_1 = require("../domain/workout-session.entity");
const client_1 = require("@prisma/client");
let PrismaSessionRepository = class PrismaSessionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(session) {
        const created = await this.prisma.workoutSession.create({
            data: {
                id: session.id,
                userId: session.userId,
                trainingDayId: session.trainingDayId,
                status: session.status,
                startedAt: session.startedAt,
                completedAt: session.completedAt,
                totalVolume: session.totalVolume,
                durationSeconds: session.durationSeconds,
            },
            include: {
                sets: true,
            },
        });
        return this.mapSessionToDomain(created);
    }
    async findSessionById(id) {
        const session = await this.prisma.workoutSession.findUnique({
            where: { id },
            include: {
                sets: {
                    orderBy: { setIndex: 'asc' },
                },
            },
        });
        return session ? this.mapSessionToDomain(session) : null;
    }
    async findActiveSessionByUser(userId) {
        const session = await this.prisma.workoutSession.findFirst({
            where: {
                userId,
                status: client_1.SessionStatus.IN_PROGRESS,
            },
            include: {
                sets: {
                    orderBy: { setIndex: 'asc' },
                },
            },
            orderBy: {
                startedAt: 'desc',
            },
        });
        return session ? this.mapSessionToDomain(session) : null;
    }
    async findUserSessions(userId, filters) {
        const sessions = await this.prisma.workoutSession.findMany({
            where: {
                userId,
                ...(filters?.status && { status: filters.status }),
                ...(filters?.startDate && {
                    startedAt: { gte: filters.startDate },
                }),
                ...(filters?.endDate && {
                    startedAt: { lte: filters.endDate },
                }),
            },
            include: {
                sets: {
                    orderBy: { setIndex: 'asc' },
                },
            },
            orderBy: {
                startedAt: 'desc',
            },
        });
        return sessions.map((s) => this.mapSessionToDomain(s));
    }
    async updateSession(session) {
        const updated = await this.prisma.workoutSession.update({
            where: { id: session.id },
            data: {
                status: session.status,
                completedAt: session.completedAt,
                totalVolume: session.totalVolume,
                durationSeconds: session.durationSeconds,
            },
            include: {
                sets: {
                    orderBy: { setIndex: 'asc' },
                },
            },
        });
        return this.mapSessionToDomain(updated);
    }
    async addSetToSession(set) {
        const created = await this.prisma.workoutSet.create({
            data: {
                id: set.id,
                sessionId: set.sessionId,
                dayExerciseId: set.dayExerciseId,
                setIndex: set.setIndex,
                weightDone: set.weightDone,
                repsDone: set.repsDone,
                rpeDone: set.rpeDone,
                restStartedAt: set.restStartedAt,
                restCompletedAt: set.restCompletedAt,
            },
        });
        return this.mapSetToDomain(created);
    }
    mapSessionToDomain(raw) {
        return new workout_session_entity_1.WorkoutSession(raw.id, raw.userId, raw.trainingDayId, raw.status, raw.startedAt, raw.completedAt, raw.sets.map((s) => this.mapSetToDomain(s)), raw.createdAt, raw.updatedAt);
    }
    mapSetToDomain(raw) {
        return new workout_session_entity_1.WorkoutSet(raw.id, raw.sessionId, raw.dayExerciseId, raw.setIndex, raw.weightDone, raw.repsDone, raw.rpeDone, raw.restStartedAt, raw.restCompletedAt, raw.createdAt);
    }
};
exports.PrismaSessionRepository = PrismaSessionRepository;
exports.PrismaSessionRepository = PrismaSessionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaSessionRepository);
//# sourceMappingURL=prisma-session.repository.js.map