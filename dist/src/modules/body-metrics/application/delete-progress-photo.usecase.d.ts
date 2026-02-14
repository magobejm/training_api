import { IBodyMetricRepository } from '../domain/body-metric.repository';
export declare class DeleteProgressPhotoUseCase {
    private readonly repository;
    constructor(repository: IBodyMetricRepository);
    execute(command: {
        photoId: string;
        userId: string;
    }): Promise<void>;
}
