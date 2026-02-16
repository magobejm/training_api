import { Test, TestingModule } from '@nestjs/testing';
import { CreateExerciseUseCase } from './create-exercise.usecase';
import { IExerciseRepository } from '../domain/exercise.repository';
import { Exercise } from '../domain/exercise.entity';

const mockExerciseRepository = {
    create: jest.fn(),
    findAllMuscleGroups: jest.fn(),
};

describe('CreateExerciseUseCase', () => {
    let service: CreateExerciseUseCase;
    let repository: IExerciseRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateExerciseUseCase,
                {
                    provide: IExerciseRepository,
                    useValue: mockExerciseRepository,
                },
            ],
        }).compile();

        service = module.get<CreateExerciseUseCase>(CreateExerciseUseCase);
        repository = module.get<IExerciseRepository>(IExerciseRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create an exercise successfully', async () => {
        const createDto = {
            name: 'Push Up',
            description: 'Description',
            muscleGroup: 'CHEST',
            userId: 'user-id',
        };

        const createdExercise = new Exercise(
            'generated-id',
            createDto.name,
            createDto.description,
            createDto.muscleGroup,
            null,
            null,
            null,
            new Date(),
            new Date(),
            createDto.userId,
            null,
            null,
            null,
            null
        );

        mockExerciseRepository.findAllMuscleGroups.mockResolvedValue([
            { id: 'mg-1', name: 'CHEST', imageUrl: null }
        ]);
        mockExerciseRepository.create.mockResolvedValue(createdExercise);

        const result = await service.execute(createDto);

        expect(result).toEqual(createdExercise);
        expect(mockExerciseRepository.findAllMuscleGroups).toHaveBeenCalled();
        expect(mockExerciseRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: createDto.name,
                description: createDto.description,
                muscleGroup: createDto.muscleGroup,
                createdBy: createDto.userId,
            }),
        );
    });
});
