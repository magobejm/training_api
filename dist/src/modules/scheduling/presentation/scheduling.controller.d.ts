import { ScheduleWorkoutUseCase } from '../application/schedule-workout.usecase';
import { GetUpcomingScheduleUseCase } from '../application/get-upcoming-schedule.usecase';
import { RescheduleWorkoutUseCase } from '../application/reschedule-workout.usecase';
import { CancelScheduledWorkoutUseCase } from '../application/cancel-scheduled-workout.usecase';
import { ScheduleWorkoutDto, RescheduleWorkoutDto, GetScheduleQueryDto } from './scheduling.dto';
export declare class SchedulingController {
    private readonly scheduleWorkoutUseCase;
    private readonly getUpcomingUseCase;
    private readonly rescheduleUseCase;
    private readonly cancelUseCase;
    constructor(scheduleWorkoutUseCase: ScheduleWorkoutUseCase, getUpcomingUseCase: GetUpcomingScheduleUseCase, rescheduleUseCase: RescheduleWorkoutUseCase, cancelUseCase: CancelScheduledWorkoutUseCase);
    scheduleWorkout(dto: ScheduleWorkoutDto, user: any): Promise<{
        id: string;
        trainerId: string;
        trainingDayId: string;
        scheduledFor: Date;
        completed: boolean;
        reminderSent: boolean;
        notes: string | null;
    }>;
    getUpcoming(query: GetScheduleQueryDto, userId: string): Promise<{
        workouts: {
            id: string;
            trainerId: string;
            trainingDayId: string;
            scheduledFor: Date;
            completed: boolean;
            reminderSent: boolean;
            notes: string | null;
        }[];
        total: number;
    }>;
    reschedule(workoutId: string, dto: RescheduleWorkoutDto, userId: string): Promise<{
        id: string;
        scheduledFor: Date;
    }>;
    cancel(workoutId: string, userId: string): Promise<{
        message: string;
    }>;
}
