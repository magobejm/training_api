import { Module } from '@nestjs/common';
import { SchedulingController } from './presentation/scheduling.controller';
import { ScheduleWorkoutUseCase } from './application/schedule-workout.usecase';
import { GetUpcomingScheduleUseCase } from './application/get-upcoming-schedule.usecase';
import { RescheduleWorkoutUseCase } from './application/reschedule-workout.usecase';
import { CancelScheduledWorkoutUseCase } from './application/cancel-scheduled-workout.usecase';
import { PrismaSchedulingRepository } from './infra/prisma-scheduling.repository';
import { ISchedulingRepository } from './domain/scheduling.repository';

@Module({
    controllers: [SchedulingController],
    providers: [
        // Use cases
        ScheduleWorkoutUseCase,
        GetUpcomingScheduleUseCase,
        RescheduleWorkoutUseCase,
        CancelScheduledWorkoutUseCase,
        // Repository
        {
            provide: ISchedulingRepository,
            useClass: PrismaSchedulingRepository,
        },
    ],
    exports: [ISchedulingRepository],
})
export class SchedulingModule { }
