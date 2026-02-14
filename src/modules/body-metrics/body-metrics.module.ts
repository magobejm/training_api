import { Module } from '@nestjs/common';
import { BodyMetricsController } from './presentation/body-metrics.controller';
import { LogBodyMetricUseCase } from './application/log-body-metric.usecase';
import { GetBodyMetricsHistoryUseCase } from './application/get-body-metrics-history.usecase';
import { UploadProgressPhotoUseCase } from './application/upload-progress-photo.usecase';
import { GetProgressPhotosUseCase } from './application/get-progress-photos.usecase';
import { DeleteProgressPhotoUseCase } from './application/delete-progress-photo.usecase';
import { PrismaBodyMetricRepository } from './infra/prisma-body-metric.repository';
import { IBodyMetricRepository } from './domain/body-metric.repository';

@Module({
    controllers: [BodyMetricsController],
    providers: [
        // Use cases
        LogBodyMetricUseCase,
        GetBodyMetricsHistoryUseCase,
        UploadProgressPhotoUseCase,
        GetProgressPhotosUseCase,
        DeleteProgressPhotoUseCase,
        // Repository
        {
            provide: IBodyMetricRepository,
            useClass: PrismaBodyMetricRepository,
        },
    ],
    exports: [IBodyMetricRepository],
})
export class BodyMetricsModule { }
