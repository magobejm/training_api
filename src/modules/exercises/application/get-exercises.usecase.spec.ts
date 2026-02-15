import { Test, TestingModule } from '@nestjs/testing';
import { GetExercisesUseCase } from './get-exercises.usecase';
import { IExerciseRepository } from '../domain/exercise.repository';
import { Exercise } from '../domain/exercise.entity';

const mockExerciseRepository = {
    findAll: jest.fn(),
};

describe('GetExercisesUseCase', () => {
    let service: GetExercisesUseCase;
    let repository: IExerciseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetExercisesUseCase,
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<GetExercisesUseCase>(GetExercisesUseCase);
        repository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an array of exercises', async () => {
        const exercises = [
            new Exercise(
                '1',
                'Push Up',
                'Desc',
                'CHEST',
                null,
                null,
                null,
                new Date(),
                new Date(),
                'user1',
            ),
            new Exercise(
                '2',
                'Pull Up',
                'Desc',
                'BACK',
                null,
                null,
                null,
                new Date(),
                new Date(),
                'user1',
            ),
        ];

        mockExerciseRepository.findAll.mockResolvedValue(exercises);

        const result = await service.execute();

        expect(result).toEqual(exercises);
        expect(mockExerciseRepository.findAll).toHaveBeenCalled();
    });
});
