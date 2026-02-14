export enum SessionStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ABANDONED = 'ABANDONED',
}

export class WorkoutSet {
    constructor(
        public readonly id: string,
        public readonly sessionId: string,
        public readonly dayExerciseId: string,
        public readonly setIndex: number,
        public readonly weightDone: number,
        public readonly repsDone: number,
        public readonly rpeDone: number | null,
        public readonly restStartedAt: Date | null,
        public readonly restCompletedAt: Date | null,
        public readonly createdAt: Date,
    ) { }

    get volume(): number {
        return this.weightDone * this.repsDone;
    }

    static create(
        sessionId: string,
        dayExerciseId: string,
        setIndex: number,
        weightDone: number,
        repsDone: number,
        rpeDone?: number,
    ): WorkoutSet {
        return new WorkoutSet(
            crypto.randomUUID(),
            sessionId,
            dayExerciseId,
            setIndex,
            weightDone,
            repsDone,
            rpeDone || null,
            null,
            null,
            new Date(),
        );
    }
}

export class WorkoutSession {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly trainingDayId: string,
        public readonly status: SessionStatus,
        public readonly startedAt: Date,
        public readonly completedAt: Date | null,
        public readonly sets: WorkoutSet[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    get totalVolume(): number {
        return this.sets.reduce((sum, set) => sum + set.volume, 0);
    }

    get durationSeconds(): number | null {
        if (!this.completedAt) return null;
        return Math.floor(
            (this.completedAt.getTime() - this.startedAt.getTime()) / 1000,
        );
    }

    static start(userId: string, trainingDayId: string): WorkoutSession {
        return new WorkoutSession(
            crypto.randomUUID(),
            userId,
            trainingDayId,
            SessionStatus.IN_PROGRESS,
            new Date(),
            null,
            [],
            new Date(),
            new Date(),
        );
    }

    complete(): WorkoutSession {
        return new WorkoutSession(
            this.id,
            this.userId,
            this.trainingDayId,
            SessionStatus.COMPLETED,
            this.startedAt,
            new Date(),
            this.sets,
            this.createdAt,
            new Date(),
        );
    }
}
