export declare enum SessionStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ABANDONED = "ABANDONED"
}
export declare class WorkoutSet {
    readonly id: string;
    readonly sessionId: string;
    readonly dayExerciseId: string;
    readonly setIndex: number;
    readonly weightDone: number;
    readonly repsDone: number;
    readonly rpeDone: number | null;
    readonly restStartedAt: Date | null;
    readonly restCompletedAt: Date | null;
    readonly createdAt: Date;
    constructor(id: string, sessionId: string, dayExerciseId: string, setIndex: number, weightDone: number, repsDone: number, rpeDone: number | null, restStartedAt: Date | null, restCompletedAt: Date | null, createdAt: Date);
    get volume(): number;
    static create(sessionId: string, dayExerciseId: string, setIndex: number, weightDone: number, repsDone: number, rpeDone?: number): WorkoutSet;
}
export declare class WorkoutSession {
    readonly id: string;
    readonly userId: string;
    readonly trainingDayId: string;
    readonly status: SessionStatus;
    readonly startedAt: Date;
    readonly completedAt: Date | null;
    readonly sets: WorkoutSet[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, userId: string, trainingDayId: string, status: SessionStatus, startedAt: Date, completedAt: Date | null, sets: WorkoutSet[], createdAt: Date, updatedAt: Date);
    get totalVolume(): number;
    get durationSeconds(): number | null;
    static start(userId: string, trainingDayId: string): WorkoutSession;
    complete(): WorkoutSession;
}
