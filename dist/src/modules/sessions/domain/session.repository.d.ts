import { WorkoutSession, WorkoutSet } from './workout-session.entity';
export interface ISessionRepository {
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
}
export declare const ISessionRepository: unique symbol;
