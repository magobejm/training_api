import { Test, TestingModule } from '@nestjs/testing';
import { GetTrainingPlanUseCase } from './get-training-plan.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

const mockTrainingRepository = {
    getPlanById: jest.fn(),
};

describe('GetTrainingPlanUseCase', () => {
    let service: GetTrainingPlanUseCase;
    let repository: ITrainingRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTrainingPlanUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
            ],
        }).compile();

        service = module.get<GetTrainingPlanUseCase>(GetTrainingPlanUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a training plan if found', async () => {
        const plan = TrainingPlan.create('Plan 1', 'Desc 1', 'user1');
        mockTrainingRepository.getPlanById.mockResolvedValue(plan);

        const result = await service.execute('plan-id');

        expect(result).toEqual(plan);
        expect(mockTrainingRepository.getPlanById).toHaveBeenCalledWith('plan-id');
    });

    it('should return null if not found', async () => {
        mockTrainingRepository.getPlanById.mockResolvedValue(null);

        const result = await service.execute('non-existent');

        expect(result).toBeNull();
        expect(mockTrainingRepository.getPlanById).toHaveBeenCalledWith('non-existent');
    });
});
