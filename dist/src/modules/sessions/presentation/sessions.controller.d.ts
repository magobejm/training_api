import { StartWorkoutSessionUseCase } from '../application/start-workout-session.usecase';
import { LogWorkoutSetUseCase } from '../application/log-workout-set.usecase';
import { CompleteWorkoutSessionUseCase } from '../application/complete-workout-session.usecase';
import { GetWorkoutSessionUseCase } from '../application/get-workout-session.usecase';
import { GetWorkoutHistoryUseCase } from '../application/get-workout-history.usecase';
import { StartSessionDto, LogSetDto, GetHistoryQueryDto } from './sessions.dto';
export declare class SessionsController {
    private readonly startSessionUseCase;
    private readonly logSetUseCase;
    private readonly completeSessionUseCase;
    private readonly getSessionUseCase;
    private readonly getHistoryUseCase;
    constructor(startSessionUseCase: StartWorkoutSessionUseCase, logSetUseCase: LogWorkoutSetUseCase, completeSessionUseCase: CompleteWorkoutSessionUseCase, getSessionUseCase: GetWorkoutSessionUseCase, getHistoryUseCase: GetWorkoutHistoryUseCase);
    startSession(dto: StartSessionDto, userId: string): Promise<{
        id: string;
        userId: string;
        trainingDayId: string;
        status: import("../domain/workout-session.entity").SessionStatus;
        startedAt: Date;
        completedAt: Date | null;
        totalVolume: number;
        durationSeconds: number | null;
        sets: {
            id: string;
            dayExerciseId: string;
            setIndex: number;
            weightDone: number;
            repsDone: number;
            rpeDone: number | null;
            volume: number;
        }[];
    }>;
    logSet(sessionId: string, dto: LogSetDto, userId: string): Promise<{
        id: string;
        sessionId: string;
        dayExerciseId: string;
        setIndex: number;
        weightDone: number;
        repsDone: number;
        rpeDone: number | null;
        volume: number;
        createdAt: Date;
    }>;
    completeSession(sessionId: string, userId: string): Promise<{
        id: string;
        status: import("../domain/workout-session.entity").SessionStatus;
        completedAt: Date | null;
        totalVolume: number;
        durationSeconds: number | null;
    }>;
    getSession(sessionId: string, userId: string): Promise<{
        id: string;
        userId: string;
        trainingDayId: string;
        status: import("../domain/workout-session.entity").SessionStatus;
        startedAt: Date;
        completedAt: Date | null;
        totalVolume: number;
        durationSeconds: number | null;
        sets: {
            id: string;
            dayExerciseId: string;
            setIndex: number;
            weightDone: number;
            repsDone: number;
            rpeDone: number | null;
            volume: number;
            createdAt: Date;
        }[];
    }>;
    getHistory(query: GetHistoryQueryDto, userId: string): Promise<{
        sessions: {
            id: string;
            trainingDayId: string;
            status: import("../domain/workout-session.entity").SessionStatus;
            startedAt: Date;
            completedAt: Date | null;
            totalVolume: number;
            durationSeconds: number | null;
            setsCount: number;
        }[];
        total: number;
    }>;
}
