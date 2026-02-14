import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ISessionRepository } from '../domain/session.repository';
import {
    WorkoutSession,
    WorkoutSet,
    SessionStatus,
} from '../domain/workout-session.entity';
import {
    WorkoutSession as PrismaWorkoutSession,
    WorkoutSet as PrismaWorkoutSet,
    SessionStatus as PrismaSessionStatus,
} from '@prisma/client';

@Injectable()
export class PrismaSessionRepository implements ISessionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createSession(session: WorkoutSession): Promise<WorkoutSession> {
        const created = await this.prisma.workoutSession.create({
            data: {
                id: session.id,
                userId: session.userId,
                trainingDayId: session.trainingDayId,
                status: session.status as PrismaSessionStatus,
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

    async findSessionById(id: string): Promise<WorkoutSession | null> {
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

    async findActiveSessionByUser(
        userId: string,
    ): Promise<WorkoutSession | null> {
        const session = await this.prisma.workoutSession.findFirst({
            where: {
                userId,
                status: PrismaSessionStatus.IN_PROGRESS,
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

    async findUserSessions(
        userId: string,
        filters?: {
            status?: string;
            startDate?: Date;
            endDate?: Date;
        },
    ): Promise<WorkoutSession[]> {
        const sessions = await this.prisma.workoutSession.findMany({
            where: {
                userId,
                ...(filters?.status && { status: filters.status as PrismaSessionStatus }),
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

    async updateSession(session: WorkoutSession): Promise<WorkoutSession> {
        const updated = await this.prisma.workoutSession.update({
            where: { id: session.id },
            data: {
                status: session.status as PrismaSessionStatus,
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

    async addSetToSession(set: WorkoutSet): Promise<WorkoutSet> {
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

    private mapSessionToDomain(
        raw: PrismaWorkoutSession & { sets: PrismaWorkoutSet[] },
    ): WorkoutSession {
        return new WorkoutSession(
            raw.id,
            raw.userId,
            raw.trainingDayId,
            raw.status as SessionStatus,
            raw.startedAt,
            raw.completedAt,
            raw.sets.map((s) => this.mapSetToDomain(s)),
            raw.createdAt,
            raw.updatedAt,
        );
    }

    private mapSetToDomain(raw: PrismaWorkoutSet): WorkoutSet {
        return new WorkoutSet(
            raw.id,
            raw.sessionId,
            raw.dayExerciseId,
            raw.setIndex,
            raw.weightDone,
            raw.repsDone,
            raw.rpeDone,
            raw.restStartedAt,
            raw.restCompletedAt,
            raw.createdAt,
        );
    }
}
