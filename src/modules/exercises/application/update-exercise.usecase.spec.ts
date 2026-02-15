import { Test, TestingModule } from '@nestjs/testing';
import { UpdateExerciseUseCase } from './update-exercise.usecase';
import { IExerciseRepository } from '../domain/exercise.repository';
import { Exercise } from '../domain/exercise.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockExerciseRepository = {
    findById: jest.fn(),
    update: jest.fn(),
};

describe('UpdateExerciseUseCase', () => {
    let service: UpdateExerciseUseCase;
    let repository: IExerciseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateExerciseUseCase,
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<UpdateExerciseUseCase>(UpdateExerciseUseCase);
        repository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update exercise successfully', async () => {
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
            'user-id', // Created by this user
        );

        const updateData = {
            name: 'Updated Push Up',
        };

        const updatedExercise = { ...existingExercise, ...updateData };

        mockExerciseRepository.findById.mockResolvedValue(existingExercise);
        mockExerciseRepository.update.mockResolvedValue(updatedExercise);

        const result = await service.execute({
            id: 'exercise-id',
            data: updateData,
            userId: 'user-id',
        });

        expect(result).toEqual(updatedExercise);
        expect(mockExerciseRepository.findById).toHaveBeenCalledWith('exercise-id');
        expect(mockExerciseRepository.update).toHaveBeenCalledWith('exercise-id', {
            ...updateData,
            updatedBy: 'user-id',
        });
    });

    it('should throw NotFoundException if exercise does not exist', async () => {
        mockExerciseRepository.findById.mockResolvedValue(null);

        await expect(
            service.execute({
                id: 'non-existent-id',
                data: {},
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
            'other-user-id', // Created by someone else
        );

        mockExerciseRepository.findById.mockResolvedValue(existingExercise);

        await expect(
            service.execute({
                id: 'exercise-id',
                data: {},
                userId: 'current-user-id',
            }),
        ).rejects.toThrow(ForbiddenException);
    });
});
