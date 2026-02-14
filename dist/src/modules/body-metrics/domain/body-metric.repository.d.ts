import { BodyMetric, ProgressPhoto } from './body-metric.entity';
export interface IBodyMetricRepository {
    logMetric(metric: BodyMetric): Promise<BodyMetric>;
    findUserMetrics(userId: string, filters?: {
        startDate?: Date;
        endDate?: Date;
    }): Promise<BodyMetric[]>;
    uploadPhoto(photo: ProgressPhoto): Promise<ProgressPhoto>;
    findUserPhotos(userId: string): Promise<ProgressPhoto[]>;
    deletePhoto(photoId: string): Promise<void>;
    findPhotoById(photoId: string): Promise<ProgressPhoto | null>;
}
export declare const IBodyMetricRepository: unique symbol;
