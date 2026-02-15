export declare class CreateScheduledWorkoutDto {
    userId: string;
    trainingDayId: string;
    scheduledFor: string;
    notes?: string;
}
export declare class UpdateScheduledWorkoutDto {
    scheduledFor?: string;
    completed?: boolean;
    notes?: string;
}
