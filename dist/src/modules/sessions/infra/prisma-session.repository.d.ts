import { PrismaService } from '../../../prisma/prisma.service';
import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession, WorkoutSet } from '../domain/workout-session.entity';
export declare class PrismaSessionRepository implements ISessionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSession(session: WorkoutSession): Promise<WorkoutSession>;
    findSessionById(id: string): Promise<WorkoutSession | null>;
    findActiveSessionByUser(userId: string): Promise<WorkoutSession | null>;
    findUserSessions(userId: string, filters?: {
        status?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<WorkoutSession[]>;
    updateSession(session: WorkoutSession): Promise<WorkoutSession>;
    addSetToSession(set: WorkoutSet): Promise<WorkoutSet>;
    private mapSessionToDomain;
    private mapSetToDomain;
}
