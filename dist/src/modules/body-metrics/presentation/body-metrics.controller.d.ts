import { LogBodyMetricUseCase } from '../application/log-body-metric.usecase';
import { GetBodyMetricsHistoryUseCase } from '../application/get-body-metrics-history.usecase';
import { UploadProgressPhotoUseCase } from '../application/upload-progress-photo.usecase';
import { GetProgressPhotosUseCase } from '../application/get-progress-photos.usecase';
import { DeleteProgressPhotoUseCase } from '../application/delete-progress-photo.usecase';
import { LogMetricDto, UploadPhotoDto, GetMetricsQueryDto } from './body-metrics.dto';
export declare class BodyMetricsController {
    private readonly logMetricUseCase;
    private readonly getHistoryUseCase;
    private readonly uploadPhotoUseCase;
    private readonly getPhotosUseCase;
    private readonly deletePhotoUseCase;
    constructor(logMetricUseCase: LogBodyMetricUseCase, getHistoryUseCase: GetBodyMetricsHistoryUseCase, uploadPhotoUseCase: UploadProgressPhotoUseCase, getPhotosUseCase: GetProgressPhotosUseCase, deletePhotoUseCase: DeleteProgressPhotoUseCase);
    logMetric(dto: LogMetricDto, userId: string): Promise<{
        id: string;
        weight: number;
        height: number | null;
        bodyFat: number | null;
        measurements: Record<string, number> | null;
        notes: string | null;
        loggedAt: Date;
    }>;
    getHistory(query: GetMetricsQueryDto, userId: string): Promise<{
        metrics: {
            id: string;
            weight: number;
            height: number | null;
            bodyFat: number | null;
            measurements: Record<string, number> | null;
            notes: string | null;
            loggedAt: Date;
        }[];
        total: number;
    }>;
    uploadPhoto(dto: UploadPhotoDto, userId: string): Promise<{
        id: string;
        imageUrl: string;
        caption: string | null;
        loggedAt: Date;
    }>;
    getPhotos(userId: string): Promise<{
        photos: {
            id: string;
            imageUrl: string;
            caption: string | null;
            loggedAt: Date;
        }[];
        total: number;
    }>;
    deletePhoto(photoId: string, userId: string): Promise<{
        message: string;
    }>;
}
