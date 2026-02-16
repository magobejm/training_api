import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';
export declare class LogBodyMetricUseCase {
    private readonly repository;
    constructor(repository: IBodyMetricRepository);
    execute(command: {
        userId: string;
        weight: number;
        height?: number;
        bodyFat?: number;
        measurements?: Record<string, number>;
        notes?: string;
        waist?: number;
        hips?: number;
        chest?: number;
        arm?: number;
        leg?: number;
    }): Promise<BodyMetric>;
}
