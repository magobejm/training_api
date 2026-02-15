import { Test, TestingModule } from '@nestjs/testing';
import { GetUpcomingScheduleUseCase } from './get-upcoming-schedule.usecase';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';

describe('GetUpcomingScheduleUseCase', () => {
    let useCase: GetUpcomingScheduleUseCase;
    let repository: ISchedulingRepository;

    const mockRepository = {
        findUpcoming: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUpcomingScheduleUseCase,
                {
                    provide: ISchedulingRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        useCase = module.get<GetUpcomingScheduleUseCase>(GetUpcomingScheduleUseCase);
        repository = module.get<ISchedulingRepository>(ISchedulingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should call repository with userId and date filters', async () => {
        const userId = 'client-1';
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-31');

        const expectedWorkouts = [
            new ScheduledWorkout(
                '1',
                userId,
                'trainer-1',
                'day-1',
                new Date(),
                false,
                false,
                null,
                new Date(),
                new Date()
            )
        ];
        mockRepository.findUpcoming.mockResolvedValue(expectedWorkouts);

        const result = await useCase.execute({ userId, startDate, endDate });

        expect(repository.findUpcoming).toHaveBeenCalledWith(userId, {
            startDate,
            endDate,
            trainerId: undefined,
        });
        expect(result).toEqual(expectedWorkouts);
    });

    it('should call repository with trainerId when provided', async () => {
        const userId = 'trainer-1';
        const trainerId = 'trainer-1';
        const startDate = new Date('2024-01-01');

        mockRepository.findUpcoming.mockResolvedValue([]);

        await useCase.execute({ userId, startDate, trainerId });

        expect(repository.findUpcoming).toHaveBeenCalledWith(userId, {
            startDate,
            endDate: undefined,
            trainerId,
        });
    });
});
