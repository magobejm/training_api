import { Test, TestingModule } from '@nestjs/testing';
import { CreateTrainingPlanUseCase } from './create-training-plan.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { IExerciseRepository } from '../../exercises/domain/exercise.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

const mockTrainingRepository = {
    createPlan: jest.fn(),
};

describe('CreateTrainingPlanUseCase', () => {
    let service: CreateTrainingPlanUseCase;
    let repository: ITrainingRepository;

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
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<CreateTrainingPlanUseCase>(CreateTrainingPlanUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a training plan successfully', async () => {
        const command = {
            name: 'My Plan',
            description: 'Test Plan',
            authorId: 'user-id',
        };

        const createdPlan = TrainingPlan.create(
            command.name,
            command.description,
            command.authorId,
        );

        mockTrainingRepository.createPlan.mockResolvedValue(createdPlan);

        const result = await service.execute(command);

        expect(result).toEqual(createdPlan);
        expect(mockTrainingRepository.createPlan).toHaveBeenCalledWith(
            expect.objectContaining({
                name: command.name,
                description: command.description,
                authorId: command.authorId,
            }),
        );
    });
});
