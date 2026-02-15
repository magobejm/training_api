import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleWorkoutUseCase } from './schedule-workout.usecase';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';
import { ForbiddenException } from '@nestjs/common';

describe('ScheduleWorkoutUseCase', () => {
    let useCase: ScheduleWorkoutUseCase;
    let repository: ISchedulingRepository;

    const mockRepository = {
        scheduleWorkout: jest.fn(),
        hasOverlap: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScheduleWorkoutUseCase,
                {
                    provide: ISchedulingRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        useCase = module.get<ScheduleWorkoutUseCase>(ScheduleWorkoutUseCase);
        repository = module.get<ISchedulingRepository>(ISchedulingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should schedule a workout if no overlap', async () => {
        const command = {
            userId: 'user-1',
            trainerId: 'trainer-1',
            trainingDayId: 'day-1',
            scheduledFor: new Date('2024-01-01T10:00:00Z'),
            notes: 'Test',
        };

        mockRepository.hasOverlap.mockResolvedValue(false);
        mockRepository.scheduleWorkout.mockResolvedValue({ id: '1', ...command } as any);

        await useCase.execute(command);

        expect(repository.hasOverlap).toHaveBeenCalledWith(command.userId, command.scheduledFor);
        expect(repository.scheduleWorkout).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if overlap exists', async () => {
        const command = {
            userId: 'user-1',
            trainerId: 'trainer-1',
            trainingDayId: 'day-1',
            scheduledFor: new Date('2024-01-01T10:00:00Z'),
        };

        mockRepository.hasOverlap.mockResolvedValue(true);

        await expect(useCase.execute(command)).rejects.toThrow(ForbiddenException);
        expect(repository.hasOverlap).toHaveBeenCalledWith(command.userId, command.scheduledFor);
        expect(repository.scheduleWorkout).not.toHaveBeenCalled();
    });
});
