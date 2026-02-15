import { Test, TestingModule } from '@nestjs/testing';
import { CreateTrainingPlanUseCase } from './create-training-plan.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { Exercise } from '../../exercises/domain/exercise.entity';

describe('CreateTrainingPlanUseCase (Nested)', () => {
    let service: CreateTrainingPlanUseCase;
    let trainingRepository: ITrainingRepository;
    let exerciseRepository: IExerciseRepository;

    const mockTrainingRepository = {
        createPlan: jest.fn(),
    };

    const mockExerciseRepository = {
        findAllByIds: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTrainingPlanUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<CreateTrainingPlanUseCase>(CreateTrainingPlanUseCase);
        trainingRepository = module.get<ITrainingRepository>(ITrainingRepository);
        exerciseRepository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a plan with nested days and exercises', async () => {
        const exercise = Exercise.create('Squat', 'Legs', 'Legs', null, null, null, 'sys');
        (exercise as any).id = 'ex1'; // Force ID

        mockExerciseRepository.findAllByIds.mockResolvedValue([exercise]);
        mockTrainingRepository.createPlan.mockImplementation((plan) => Promise.resolve(plan));

        const command = {
            name: 'Nested Plan',
            description: 'Test Description',
            authorId: 'user1',
            days: [
                {
                    name: 'Leg Day',
                    order: 1,
                    exercises: [
                        {
                            exerciseId: 'ex1',
                            order: 1,
                            targetSets: 3,
                            targetReps: '10',
                            restSeconds: 60,
                        },
                    ],
                },
            ],
        };

        const result = await service.execute(command);

        expect(result).toBeInstanceOf(TrainingPlan);
        expect(result.days).toHaveLength(1);
        expect(result.days[0].name).toBe('Leg Day');
        expect(result.days[0].exercises).toHaveLength(1);
        expect(result.days[0].exercises[0].exercise.id).toBe('ex1');

        expect(mockExerciseRepository.findAllByIds).toHaveBeenCalledWith(['ex1']);
        expect(mockTrainingRepository.createPlan).toHaveBeenCalled();
    });
});
