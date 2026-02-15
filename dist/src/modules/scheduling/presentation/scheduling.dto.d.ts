export declare class ScheduleWorkoutDto {
    trainerId?: string;
    clientId?: string;
    trainingDayId: string;
    scheduledFor: string;
    notes?: string;
}
export declare class RescheduleWorkoutDto {
    newDate: string;
}
export declare class GetScheduleQueryDto {
    startDate?: string;
    endDate?: string;
}
