import { Test, TestingModule } from '@nestjs/testing';
import { GetTrainingPlansUseCase } from './get-training-plans.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

const mockTrainingRepository = {
    findAll: jest.fn(),
};

describe('GetTrainingPlansUseCase', () => {
    let service: GetTrainingPlansUseCase;
    let repository: ITrainingRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTrainingPlansUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
            ],
        }).compile();

        service = module.get<GetTrainingPlansUseCase>(GetTrainingPlansUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return training plans', async () => {
        const plans = [
            TrainingPlan.create('Plan 1', 'Desc 1', 'user1'),
            TrainingPlan.create('Plan 2', 'Desc 2', 'user1'),
        ];

        mockTrainingRepository.findAll.mockResolvedValue(plans);

        const result = await service.execute('user1');

        expect(result).toEqual(plans);
        expect(mockTrainingRepository.findAll).toHaveBeenCalledWith('user1');
    });
});
