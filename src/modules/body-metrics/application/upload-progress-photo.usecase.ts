import { Inject, Injectable } from '@nestjs/common';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { ProgressPhoto } from '../domain/body-metric.entity';

@Injectable()
export class UploadProgressPhotoUseCase {
    constructor(
        @Inject(IBodyMetricRepository)
        private readonly repository: IBodyMetricRepository,
    ) { }

    async execute(command: {
        userId: string;
        imageUrl: string;
        caption?: string;
    }): Promise<ProgressPhoto> {
        const photo = ProgressPhoto.create(
            command.userId,
            command.imageUrl,
            command.caption,
        );

        return this.repository.uploadPhoto(photo);
    }
}
