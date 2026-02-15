import { Test, TestingModule } from '@nestjs/testing';
import { SchedulingController } from './scheduling.controller';
import { ScheduleWorkoutUseCase } from '../application/schedule-workout.usecase';
import { GetUpcomingScheduleUseCase } from '../application/get-upcoming-schedule.usecase';
import { RescheduleWorkoutUseCase } from '../application/reschedule-workout.usecase';
import { CancelScheduledWorkoutUseCase } from '../application/cancel-scheduled-workout.usecase';
import { ScheduleWorkoutDto } from './scheduling.dto';

describe('SchedulingController', () => {
    let controller: SchedulingController;
    let scheduleUseCase: ScheduleWorkoutUseCase;

    const mockScheduleUseCase = {
        execute: jest.fn().mockImplementation((cmd) => Promise.resolve({ id: 'workout-123', ...cmd })),
    };

    const mockGetUpcomingUseCase = { execute: jest.fn() };
    const mockRescheduleUseCase = { execute: jest.fn() };
    const mockCancelUseCase = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SchedulingController],
            providers: [
                { provide: ScheduleWorkoutUseCase, useValue: mockScheduleUseCase },
                { provide: GetUpcomingScheduleUseCase, useValue: mockGetUpcomingUseCase },
                { provide: RescheduleWorkoutUseCase, useValue: mockRescheduleUseCase },
                { provide: CancelScheduledWorkoutUseCase, useValue: mockCancelUseCase },
            ],
        }).compile();

        controller = module.get<SchedulingController>(SchedulingController);
        scheduleUseCase = module.get<ScheduleWorkoutUseCase>(ScheduleWorkoutUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('scheduleWorkout', () => {
        it('should use dto.trainerId if provided', async () => {
            const dto: ScheduleWorkoutDto = {
                trainerId: 'trainer-uuid',
                clientId: 'client-uuid',
                trainingDayId: 'day-uuid',
                scheduledFor: new Date().toISOString(),
            };
            const user = { userId: 'different-trainer-uuid', role: 'TRAINER' };

            await controller.scheduleWorkout(dto, user);

            expect(mockScheduleUseCase.execute).toHaveBeenCalledWith(expect.objectContaining({
                trainerId: 'trainer-uuid',
                userId: 'client-uuid',
            }));
        });

        it('should default to current user id if trainerId is missing and user is a TRAINER', async () => {
            const dto: ScheduleWorkoutDto = {
                clientId: 'client-uuid',
                trainingDayId: 'day-uuid',
                scheduledFor: new Date().toISOString(),
            };
            const user = { userId: 'trainer-uuid', role: 'TRAINER' };

            await controller.scheduleWorkout(dto, user);

            expect(mockScheduleUseCase.execute).toHaveBeenCalledWith(expect.objectContaining({
                trainerId: 'trainer-uuid',
                userId: 'client-uuid',
            }));
        });

        it('should default to current user id for BOTH trainer and client if both IDs are missing', async () => {
            const dto: ScheduleWorkoutDto = {
                trainingDayId: 'day-uuid',
                scheduledFor: new Date().toISOString(),
            };
            const user = { userId: 'trainer-uuid', role: 'TRAINER' };

            await controller.scheduleWorkout(dto, user);

            expect(mockScheduleUseCase.execute).toHaveBeenCalledWith(expect.objectContaining({
                trainerId: 'trainer-uuid',
                userId: 'trainer-uuid',
            }));
        });
    });
});
