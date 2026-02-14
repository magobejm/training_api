export declare class StartSessionDto {
    trainingDayId: string;
}
export declare class LogSetDto {
    dayExerciseId: string;
    setIndex: number;
    weightDone: number;
    repsDone: number;
    rpeDone?: number;
}
export declare class GetHistoryQueryDto {
    status?: string;
    startDate?: string;
    endDate?: string;
}
