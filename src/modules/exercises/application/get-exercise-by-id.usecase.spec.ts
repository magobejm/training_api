import { Test, TestingModule } from '@nestjs/testing';
import { GetExerciseByIdUseCase } from './get-exercise-by-id.usecase';
import { IExerciseRepository } from '../domain/exercise.repository';
import { Exercise } from '../domain/exercise.entity';
import { NotFoundException } from '@nestjs/common';

const mockExerciseRepository = {
    findById: jest.fn(),
};

describe('GetExerciseByIdUseCase', () => {
    let service: GetExerciseByIdUseCase;
    let repository: IExerciseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetExerciseByIdUseCase,
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<GetExerciseByIdUseCase>(GetExerciseByIdUseCase);
        repository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an exercise if found', async () => {
        const exercise = new Exercise(
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
        mockExerciseRepository.findById.mockResolvedValue(exercise);

        const result = await service.execute('exercise-id');

        expect(result).toEqual(exercise);
        expect(mockExerciseRepository.findById).toHaveBeenCalledWith('exercise-id');
    });

    it('should throw NotFoundException if exercise not found', async () => {
        mockExerciseRepository.findById.mockResolvedValue(null);

        await expect(service.execute('non-existent-id')).rejects.toThrow(
            NotFoundException,
        );
        expect(mockExerciseRepository.findById).toHaveBeenCalledWith(
            'non-existent-id',
        );
    });
});
