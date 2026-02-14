import { Inject, Injectable } from '@nestjs/common';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';

@Injectable()
export class LogBodyMetricUseCase {
    constructor(
        @Inject(IBodyMetricRepository)
        private readonly repository: IBodyMetricRepository,
    ) { }

    async execute(command: {
        userId: string;
        weight: number;
        height?: number;
        bodyFat?: number;
        measurements?: Record<string, number>;
        notes?: string;
    }): Promise<BodyMetric> {
        const metric = BodyMetric.create(
            command.userId,
            command.weight,
            command.height,
            command.bodyFat,
            command.measurements,
            command.notes,
        );

        return this.repository.logMetric(metric);
    }
}
