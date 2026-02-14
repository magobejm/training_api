import { PrismaService } from '../../../prisma/prisma.service';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric, ProgressPhoto } from '../domain/body-metric.entity';
export declare class PrismaBodyMetricRepository implements IBodyMetricRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logMetric(metric: BodyMetric): Promise<BodyMetric>;
    findUserMetrics(userId: string, filters?: {
        startDate?: Date;
        endDate?: Date;
    }): Promise<BodyMetric[]>;
    uploadPhoto(photo: ProgressPhoto): Promise<ProgressPhoto>;
    findUserPhotos(userId: string): Promise<ProgressPhoto[]>;
    deletePhoto(photoId: string): Promise<void>;
    findPhotoById(photoId: string): Promise<ProgressPhoto | null>;
    private mapMetricToDomain;
    private mapPhotoToDomain;
}
