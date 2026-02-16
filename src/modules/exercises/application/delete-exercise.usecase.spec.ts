import { Test, TestingModule } from '@nestjs/testing';
import { DeleteExerciseUseCase } from './delete-exercise.usecase';
import { IExerciseRepository } from '../domain/exercise.repository';
import { Exercise } from '../domain/exercise.entity';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

const mockExerciseRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
    hasDayExercises: jest.fn(),
};

describe('DeleteExerciseUseCase', () => {
    let service: DeleteExerciseUseCase;
    let repository: IExerciseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteExerciseUseCase,
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<DeleteExerciseUseCase>(DeleteExerciseUseCase);
        repository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete exercise successfully', async () => {
        const existingExercise = new Exercise(
            'exercise-id',
            'Push Up',
            'Description',
            'CHEST',
            null,
            null,
            null,
            new Date(),
            new Date(),
            'user-id', // createdBy
            null,      // updatedBy
            null,      // deletedAt
            null,      // deletedBy
            null,      // trainerId
        );

        mockExerciseRepository.findById.mockResolvedValue(existingExercise);
        mockExerciseRepository.delete.mockResolvedValue(undefined);

        await service.execute({
            id: 'exercise-id',
            userId: 'user-id',
        });

        expect(mockExerciseRepository.findById).toHaveBeenCalledWith('exercise-id');
        expect(mockExerciseRepository.delete).toHaveBeenCalledWith('exercise-id');
    });

    it('should throw NotFoundException if exercise does not exist', async () => {
        mockExerciseRepository.findById.mockResolvedValue(null);

        await expect(
            service.execute({
                id: 'non-existent-id',
                userId: 'user-id',
            }),
        ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the creator', async () => {
        const existingExercise = new Exercise(
            'exercise-id',
            'Push Up',
            'Description',
            'CHEST',
            null,
            null,
            null,
            new Date(),
            new Date(),
            'other-user-id', // createdBy
            null,            // updatedBy
            null,            // deletedAt
            null,            // deletedBy
            null,            // trainerId
        );

        mockExerciseRepository.findById.mockResolvedValue(existingExercise);

        await expect(
            service.execute({
                id: 'exercise-id',
                userId: 'current-user-id',
            }),
        ).rejects.toThrow(ForbiddenException);
    });
    it('should throw BadRequestException if exercise is used in plans', async () => {
        const existingExercise = new Exercise(
            'exercise-id',
            'Push Up',
            'Description',
            'CHEST',
            null,
            null,
            null,
            new Date(),
            new Date(),
            'user-id',
            null,
            null,
            null,
            null,
        );

        mockExerciseRepository.findById.mockResolvedValue(existingExercise);
        mockExerciseRepository.hasDayExercises.mockResolvedValue(true);

        await expect(
            service.execute({
                id: 'exercise-id',
                userId: 'user-id',
            }),
        ).rejects.toThrow(BadRequestException);
    });
});
