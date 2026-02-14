import { Inject, Injectable } from '@nestjs/common';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric } from '../domain/body-metric.entity';

@Injectable()
export class GetBodyMetricsHistoryUseCase {
    constructor(
        @Inject(IBodyMetricRepository)
        private readonly repository: IBodyMetricRepository,
    ) { }

    async execute(command: {
        userId: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<BodyMetric[]> {
        return this.repository.findUserMetrics(command.userId, {
            startDate: command.startDate,
            endDate: command.endDate,
        });
    }
}
