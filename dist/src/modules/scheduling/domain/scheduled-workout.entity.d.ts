export declare class ScheduledWorkout {
    readonly id: string;
    readonly userId: string;
    readonly trainerId: string;
    readonly trainingDayId: string;
    readonly scheduledFor: Date;
    readonly reminderSent: boolean;
    readonly completed: boolean;
    readonly notes: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly clientName?: string | undefined;
    readonly planName?: string | undefined;
    readonly dayName?: string | undefined;
    constructor(id: string, userId: string, trainerId: string, trainingDayId: string, scheduledFor: Date, reminderSent: boolean, completed: boolean, notes: string | null, createdAt: Date, updatedAt: Date, clientName?: string | undefined, planName?: string | undefined, dayName?: string | undefined);
    static create(userId: string, trainerId: string, trainingDayId: string, scheduledFor: Date, notes?: string): ScheduledWorkout;
    reschedule(newDate: Date): ScheduledWorkout;
}
