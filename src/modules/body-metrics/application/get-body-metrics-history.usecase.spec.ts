import { Test, TestingModule } from '@nestjs/testing';
import { GetBodyMetricsHistoryUseCase } from './get-body-metrics-history.usecase';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';

const mockBodyMetricRepository = {
    findUserMetrics: jest.fn(),
};

describe('GetBodyMetricsHistoryUseCase', () => {
    let service: GetBodyMetricsHistoryUseCase;
    let repository: IBodyMetricRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetBodyMetricsHistoryUseCase,
                {
                    provide: IBodyMetricRepository,
                    useValue: mockBodyMetricRepository,
                },
            ],
        }).compile();

        service = module.get<GetBodyMetricsHistoryUseCase>(GetBodyMetricsHistoryUseCase);
        repository = module.get<IBodyMetricRepository>(IBodyMetricRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return metrics history', async () => {
        const metrics = [
            BodyMetric.create('user1', 75, 180),
            BodyMetric.create('user1', 74, 180),
        ];

        mockBodyMetricRepository.findUserMetrics.mockResolvedValue(metrics);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const result = await service.execute({ userId: 'user1', startDate });

        expect(result).toEqual(metrics);
        expect(mockBodyMetricRepository.findUserMetrics).toHaveBeenCalledWith('user1', { startDate, endDate: undefined });
    });
});
