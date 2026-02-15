import { Test, TestingModule } from '@nestjs/testing';
import { RescheduleWorkoutUseCase } from './reschedule-workout.usecase';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('RescheduleWorkoutUseCase', () => {
    let useCase: RescheduleWorkoutUseCase;
    let repository: ISchedulingRepository;

    const mockRepository = {
        findById: jest.fn(),
        hasOverlap: jest.fn(),
        updateScheduledWorkout: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RescheduleWorkoutUseCase,
                {
                    provide: ISchedulingRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        useCase = module.get<RescheduleWorkoutUseCase>(RescheduleWorkoutUseCase);
        repository = module.get<ISchedulingRepository>(ISchedulingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should reschedule a workout if allowed and no overlap', async () => {
        const workoutId = 'workout-1';
        const userId = 'user-1';
        const newDate = new Date('2024-01-02T10:00:00Z');

        const existingWorkout = new ScheduledWorkout(
            workoutId,
            userId, // Owner
            'trainer-1',
            'day-1',
            new Date('2024-01-01T10:00:00Z'),
            false,
            false,
            null,
            new Date(),
            new Date(),
        );

        // Allow mock implementation of reschedule method on entity instance
        existingWorkout.reschedule = jest.fn().mockReturnValue({ ...existingWorkout, scheduledFor: newDate });

        mockRepository.findById.mockResolvedValue(existingWorkout);
        mockRepository.hasOverlap.mockResolvedValue(false);
        mockRepository.updateScheduledWorkout.mockResolvedValue({ ...existingWorkout, scheduledFor: newDate });

        const result = await useCase.execute({ scheduledWorkoutId: workoutId, userId, newDate });

        expect(repository.hasOverlap).toHaveBeenCalledWith(userId, newDate, workoutId);
        expect(repository.updateScheduledWorkout).toHaveBeenCalled();
        expect(result.scheduledFor).toEqual(newDate);
    });

    it('should allow trainer to reschedule client workout', async () => {
        const workoutId = 'workout-1';
        const userId = 'client-1';
        const trainerId = 'trainer-1';
        const newDate = new Date('2024-01-02T10:00:00Z');

        const existingWorkout = new ScheduledWorkout(
            workoutId,
            userId,
            trainerId, // Trainer is part of workout
            'day-1',
            new Date('2024-01-01T10:00:00Z'),
            false,
            false,
            null,
            new Date(),
            new Date(),
        );

        existingWorkout.reschedule = jest.fn().mockReturnValue({ ...existingWorkout, scheduledFor: newDate });

        mockRepository.findById.mockResolvedValue(existingWorkout);
        mockRepository.hasOverlap.mockResolvedValue(false);
        mockRepository.updateScheduledWorkout.mockResolvedValue({ ...existingWorkout, scheduledFor: newDate });

        // Trainer executes
        await useCase.execute({ scheduledWorkoutId: workoutId, userId: trainerId, newDate });

        expect(repository.updateScheduledWorkout).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if overlap exists', async () => {
        const workoutId = 'workout-1';
        const userId = 'user-1';
        const newDate = new Date('2024-01-02T10:00:00Z');

        const existingWorkout = new ScheduledWorkout(
            workoutId,
            userId,
            'trainer-1',
            'day-1',
            new Date('2024-01-01T10:00:00Z'),
            false,
            false,
            null,
            new Date(),
            new Date(),
        );

        mockRepository.findById.mockResolvedValue(existingWorkout);
        mockRepository.hasOverlap.mockResolvedValue(true);

        await expect(useCase.execute({ scheduledWorkoutId: workoutId, userId, newDate })).rejects.toThrow(ForbiddenException);
        expect(repository.hasOverlap).toHaveBeenCalledWith(userId, newDate, workoutId);
        expect(repository.updateScheduledWorkout).not.toHaveBeenCalled();
    });
});
