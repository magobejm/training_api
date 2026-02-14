import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ScheduleWorkoutUseCase } from '../application/schedule-workout.usecase';
import { GetUpcomingScheduleUseCase } from '../application/get-upcoming-schedule.usecase';
import { RescheduleWorkoutUseCase } from '../application/reschedule-workout.usecase';
import { CancelScheduledWorkoutUseCase } from '../application/cancel-scheduled-workout.usecase';
import {
    ScheduleWorkoutDto,
    RescheduleWorkoutDto,
    GetScheduleQueryDto,
} from './scheduling.dto';

@Controller('scheduled-workouts')
@UseGuards(JwtAuthGuard)
export class SchedulingController {
    constructor(
        private readonly scheduleWorkoutUseCase: ScheduleWorkoutUseCase,
        private readonly getUpcomingUseCase: GetUpcomingScheduleUseCase,
        private readonly rescheduleUseCase: RescheduleWorkoutUseCase,
        private readonly cancelUseCase: CancelScheduledWorkoutUseCase,
    ) { }

    @Post()
    async scheduleWorkout(
        @Body() dto: ScheduleWorkoutDto,
        @CurrentUser() user: any, // Using 'any' for now as AuthenticatedUser might not be imported or differs
    ) {
        // Determine the target user (client) and trainer
        // If trainer is scheduling, they must provide clientId (or schedule for themselves if allowed)
        // If client is scheduling (future feature), they schedule for themselves.

        const targetUserId = dto.clientId || user.userId;
        const targetTrainerId = dto.trainerId || (user.role === 'TRAINER' ? user.userId : dto.trainerId);

        const workout = await this.scheduleWorkoutUseCase.execute({
            userId: targetUserId,
            trainerId: targetTrainerId,
            trainingDayId: dto.trainingDayId,
            scheduledFor: new Date(dto.scheduledFor),
            notes: dto.notes,
        });

        return {
            id: workout.id,
            trainerId: workout.trainerId,
            trainingDayId: workout.trainingDayId,
            scheduledFor: workout.scheduledFor,
            completed: workout.completed,
            reminderSent: workout.reminderSent,
            notes: workout.notes,
        };
    }

    @Get()
    async getUpcoming(
        @Query() query: GetScheduleQueryDto,
        @CurrentUser('sub') userId: string,
    ) {
        const workouts = await this.getUpcomingUseCase.execute({
            userId,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });

        return {
            workouts: workouts.map((w) => ({
                id: w.id,
                trainerId: w.trainerId,
                trainingDayId: w.trainingDayId,
                scheduledFor: w.scheduledFor,
                completed: w.completed,
                reminderSent: w.reminderSent,
                notes: w.notes,
            })),
            total: workouts.length,
        };
    }

    @Patch(':workoutId')
    async reschedule(
        @Param('workoutId') workoutId: string,
        @Body() dto: RescheduleWorkoutDto,
        @CurrentUser('sub') userId: string,
    ) {
        const workout = await this.rescheduleUseCase.execute({
            scheduledWorkoutId: workoutId,
            newDate: new Date(dto.newDate),
            userId,
        });

        return {
            id: workout.id,
            scheduledFor: workout.scheduledFor,
        };
    }

    @Delete(':workoutId')
    async cancel(
        @Param('workoutId') workoutId: string,
        @CurrentUser('sub') userId: string,
    ) {
        await this.cancelUseCase.execute({
            scheduledWorkoutId: workoutId,
            userId,
        });

        return { message: 'Scheduled workout cancelled successfully' };
    }
}
