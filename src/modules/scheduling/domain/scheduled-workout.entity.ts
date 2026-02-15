export class ScheduledWorkout {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly trainerId: string,
        public readonly trainingDayId: string,
        public readonly scheduledFor: Date,
        public readonly reminderSent: boolean,
        public readonly completed: boolean,
        public readonly notes: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly clientName?: string,
        public readonly planName?: string,
        public readonly dayName?: string,
    ) { }

    static create(
        userId: string,
        trainerId: string,
        trainingDayId: string,
        scheduledFor: Date,
        notes?: string,
    ): ScheduledWorkout {
        return new ScheduledWorkout(
            crypto.randomUUID(),
            userId,
            trainerId,
            trainingDayId,
            scheduledFor,
            false, // reminderSent
            false, // completed
            notes || null,
            new Date(),
            new Date(),
        );
    }

    reschedule(newDate: Date): ScheduledWorkout {
        return new ScheduledWorkout(
            this.id,
            this.userId,
            this.trainerId,
            this.trainingDayId,
            newDate,
            this.reminderSent,
            this.completed,
            this.notes,
            this.createdAt,
            new Date(),
            this.clientName,
            this.planName,
            this.dayName,
        );
    }
}
