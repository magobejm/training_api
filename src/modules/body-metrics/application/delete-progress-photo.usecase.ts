import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { IBodyMetricRepository } from '../domain/body-metric.repository';

@Injectable()
export class DeleteProgressPhotoUseCase {
    constructor(
        @Inject(IBodyMetricRepository)
        private readonly repository: IBodyMetricRepository,
    ) { }

    async execute(command: {
        photoId: string;
        userId: string;
    }): Promise<void> {
        const photo = await this.repository.findPhotoById(command.photoId);

        if (!photo) {
            throw new NotFoundException('Photo not found');
        }

        // Ownership check
        if (photo.userId !== command.userId) {
            throw new ForbiddenException('You can only delete your own photos');
        }

        await this.repository.deletePhoto(command.photoId);
    }
}
