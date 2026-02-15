import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTrainingPlanUseCase } from './delete-training-plan.usecase';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

const mockTrainingRepository = {
    getPlanById: jest.fn(),
    deletePlan: jest.fn(),
    hasScheduledWorkouts: jest.fn(),
    hasActiveUsers: jest.fn(),
};

describe('DeleteTrainingPlanUseCase', () => {
    let service: DeleteTrainingPlanUseCase;
    let repository: ITrainingRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTrainingPlanUseCase,
                {
                    provide: ITrainingRepository,
                    useValue: mockTrainingRepository,
                },
            ],
        }).compile();

        service = module.get<DeleteTrainingPlanUseCase>(DeleteTrainingPlanUseCase);
        repository = module.get<ITrainingRepository>(ITrainingRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete plan successfully', async () => {
        const existingPlan = new TrainingPlan(
            'plan-id',
            'Full Body',
            'Description',
            'trainer-id',
            [],
            new Date(),
            new Date(),
        );

        mockTrainingRepository.getPlanById.mockResolvedValue(existingPlan);
        mockTrainingRepository.hasScheduledWorkouts.mockResolvedValue(false);
        mockTrainingRepository.hasActiveUsers.mockResolvedValue(false);
        mockTrainingRepository.deletePlan.mockResolvedValue(undefined);

        await service.execute({
            id: 'plan-id',
            userId: 'trainer-id',
        });

        expect(mockTrainingRepository.getPlanById).toHaveBeenCalledWith('plan-id');
        expect(mockTrainingRepository.deletePlan).toHaveBeenCalledWith('plan-id');
    });

    it('should throw NotFoundException if plan does not exist', async () => {
        mockTrainingRepository.getPlanById.mockResolvedValue(null);

        await expect(
            service.execute({
                id: 'non-existent-id',
                userId: 'trainer-id',
            }),
        ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the author', async () => {
        const existingPlan = new TrainingPlan(
            'plan-id',
            'Full Body',
            'Description',
            'other-trainer-id',
            [],
            new Date(),
            new Date(),
        );

        mockTrainingRepository.getPlanById.mockResolvedValue(existingPlan);

        await expect(
            service.execute({
                id: 'plan-id',
                userId: 'current-trainer-id',
            }),
        ).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if plan has scheduled workouts', async () => {
        const existingPlan = new TrainingPlan(
            'plan-id',
            'Full Body',
            'Description',
            'trainer-id',
            [],
            new Date(),
            new Date(),
        );

        mockTrainingRepository.getPlanById.mockResolvedValue(existingPlan);
        mockTrainingRepository.hasScheduledWorkouts.mockResolvedValue(true);

        await expect(
            service.execute({
                id: 'plan-id',
                userId: 'trainer-id',
            }),
        ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if plan has active users', async () => {
        const existingPlan = new TrainingPlan(
            'plan-id',
            'Full Body',
            'Description',
            'trainer-id',
            [],
            new Date(),
            new Date(),
        );

        mockTrainingRepository.getPlanById.mockResolvedValue(existingPlan);
        mockTrainingRepository.hasScheduledWorkouts.mockResolvedValue(false);
        mockTrainingRepository.hasActiveUsers.mockResolvedValue(true);

        await expect(
            service.execute({
                id: 'plan-id',
                userId: 'trainer-id',
            }),
        ).rejects.toThrow(BadRequestException);
    });
});
