import { Test, TestingModule } from '@nestjs/testing';
import { AddDayToPlanUseCase } from './add-day-to-plan.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockTrainingRepository = {
    getPlanById: jest.fn(),
    createDay: jest.fn(),
};

describe('AddDayToPlanUseCase', () => {
    let service: AddDayToPlanUseCase;
    let repository: ITrainingRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddDayToPlanUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
            ],
        }).compile();

        service = module.get<AddDayToPlanUseCase>(AddDayToPlanUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add a day to plan successfully', async () => {
        const plan = TrainingPlan.create('Plan 1', 'Desc', 'user1');
        const command = {
            planId: plan.id,
            name: 'Day 1',
            order: 1,
            userId: 'user1',
        };

        mockTrainingRepository.getPlanById.mockResolvedValue(plan);
        mockTrainingRepository.createDay.mockResolvedValue({} as any);

        await service.execute(command);

        expect(mockTrainingRepository.getPlanById).toHaveBeenCalledWith(plan.id);
        expect(mockTrainingRepository.createDay).toHaveBeenCalledWith(
            expect.objectContaining({ name: 'Day 1', planId: plan.id }),
        );
    });

    it('should throw NotFoundException if plan not found', async () => {
        mockTrainingRepository.getPlanById.mockResolvedValue(null);

        await expect(
            service.execute({ planId: 'invalid', name: 'Day 1', order: 1, userId: 'user1' }),
        ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not author', async () => {
        const plan = TrainingPlan.create('Plan 1', 'Desc', 'user1');
        mockTrainingRepository.getPlanById.mockResolvedValue(plan);

        await expect(
            service.execute({ planId: plan.id, name: 'Day 1', order: 1, userId: 'other' }),
        ).rejects.toThrow(ForbiddenException);
    });
});
