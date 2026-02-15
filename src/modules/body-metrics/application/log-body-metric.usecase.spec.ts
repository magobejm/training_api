import { Test, TestingModule } from '@nestjs/testing';
import { LogBodyMetricUseCase } from './log-body-metric.usecase';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';

const mockBodyMetricRepository = {
    logMetric: jest.fn(),
};

describe('LogBodyMetricUseCase', () => {
    let service: LogBodyMetricUseCase;
    let repository: IBodyMetricRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LogBodyMetricUseCase,
                {
                    provide: IBodyMetricRepository,
                    useValue: mockBodyMetricRepository,
                },
            ],
        }).compile();

        service = module.get<LogBodyMetricUseCase>(LogBodyMetricUseCase);
        repository = module.get<IBodyMetricRepository>(IBodyMetricRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should log a body metric successfully', async () => {
        const command = {
            userId: 'user1',
            weight: 75.5,
            height: 180,
            bodyFat: 15,
            measurements: { chest: 100 },
            notes: 'Feeling good',
        };

        const expectedMetric = BodyMetric.create(
            command.userId,
            command.weight,
            command.height,
            command.bodyFat,
            command.measurements,
            command.notes,
        );

        mockBodyMetricRepository.logMetric.mockResolvedValue(expectedMetric);

        const result = await service.execute(command);

        expect(result).toEqual(expectedMetric);
        expect(mockBodyMetricRepository.logMetric).toHaveBeenCalledWith(
            expect.objectContaining({
                userId: command.userId,
                weight: command.weight,
            })
        );
    });
});
