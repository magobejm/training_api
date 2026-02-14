import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { ProgressPhoto } from '../domain/body-metric.entity';
export declare class GetProgressPhotosUseCase {
    private readonly repository;
    constructor(repository: IBodyMetricRepository);
    execute(command: {
        userId: string;
    }): Promise<ProgressPhoto[]>;
}
