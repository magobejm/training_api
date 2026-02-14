import { Inject, Injectable } from '@nestjs/common';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { ProgressPhoto } from '../domain/body-metric.entity';

@Injectable()
export class GetProgressPhotosUseCase {
    constructor(
        @Inject(IBodyMetricRepository)
        private readonly repository: IBodyMetricRepository,
    ) { }

    async execute(command: {
        userId: string;
    }): Promise<ProgressPhoto[]> {
        return this.repository.findUserPhotos(command.userId);
    }
}
