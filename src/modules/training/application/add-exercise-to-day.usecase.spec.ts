import { Test, TestingModule } from '@nestjs/testing';
import { AddExerciseToDayUseCase } from './add-exercise-to-day.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { TrainingDay } from '../domain/training-day.entity';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockTrainingRepository = {
    getPlanById: jest.fn(),
    getDayById: jest.fn(),
    addExerciseToDay: jest.fn(),
};

describe('AddExerciseToDayUseCase', () => {
    let service: AddExerciseToDayUseCase;
    let repository: ITrainingRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddExerciseToDayUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
                {
                    provide: IExerciseRepository,
                    useValue: {
                        findById: jest.fn().mockResolvedValue({ id: 'ex1' }), // Mock exercise
                    },
                },
            ],
        }).compile();

        service = module.get<AddExerciseToDayUseCase>(AddExerciseToDayUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add exercise to day successfully', async () => {
        const day = new TrainingDay(
            'day-id',
            'Day 1',
            1,
            'plan-id',
            [],
            new Date(),
            new Date(),
        );
        const plan = new TrainingPlan(
            'plan-id',
            'Plan 1',
            'Desc',
            'user1',
            [day],
            new Date(),
            new Date(),
        );

        const command = {
            dayId: day.id,
            exerciseId: 'ex1',
            order: 1,
            targetSets: 3,
            targetReps: '10',
            targetRir: 2,
            restSeconds: 60,
            userId: 'user1',
        };

        mockTrainingRepository.getDayById.mockResolvedValue(day);
        mockTrainingRepository.getPlanById.mockResolvedValue(plan);
        mockTrainingRepository.addExerciseToDay.mockResolvedValue(undefined);

        await service.execute(command);

        expect(mockTrainingRepository.addExerciseToDay).toHaveBeenCalled();
    });

    it('should throw NotFoundException if day not found in plan', async () => {
        const plan = new TrainingPlan(
            'plan-id',
            'Plan 1',
            'Desc',
            'user1',
            [],
            new Date(),
            new Date(),
        );

        mockTrainingRepository.getDayById.mockResolvedValue(null);
        mockTrainingRepository.getPlanById.mockResolvedValue(plan);

        await expect(
            service.execute({
                dayId: 'invalid-day',
                exerciseId: 'ex1',
                order: 1,
                targetSets: 3,
                targetReps: '10',
                targetRir: 2,
                restSeconds: 60,
                userId: 'user1',
            }),
        ).rejects.toThrow(NotFoundException);
    });
});
