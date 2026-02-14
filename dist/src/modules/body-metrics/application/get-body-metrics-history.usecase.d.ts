import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';
export declare class GetBodyMetricsHistoryUseCase {
    private readonly repository;
    constructor(repository: IBodyMetricRepository);
    execute(command: {
        userId: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<BodyMetric[]>;
}
