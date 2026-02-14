import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IBodyMetricRepository } from '../domain/body-metric.repository';
import { BodyMetric, ProgressPhoto } from '../domain/body-metric.entity';
import {
    BodyMetric as PrismaBodyMetric,
    ProgressPhoto as PrismaProgressPhoto,
} from '@prisma/client';

@Injectable()
export class PrismaBodyMetricRepository implements IBodyMetricRepository {
    constructor(private readonly prisma: PrismaService) { }

    async logMetric(metric: BodyMetric): Promise<BodyMetric> {
        const created = await this.prisma.bodyMetric.create({
            data: {
                id: metric.id,
                userId: metric.userId,
                weight: metric.weight,
                height: metric.height,
                bodyFat: metric.bodyFat,
                measurements: metric.measurements || undefined,
                notes: metric.notes,
                loggedAt: metric.loggedAt,
            },
        });

        return this.mapMetricToDomain(created);
    }

    async findUserMetrics(
        userId: string,
        filters?: {
            startDate?: Date;
            endDate?: Date;
        },
    ): Promise<BodyMetric[]> {
        const metrics = await this.prisma.bodyMetric.findMany({
            where: {
                userId,
                ...(filters?.startDate && {
                    loggedAt: { gte: filters.startDate },
                }),
                ...(filters?.endDate && {
                    loggedAt: { lte: filters.endDate },
                }),
            },
            orderBy: {
                loggedAt: 'desc',
            },
        });

        return metrics.map((m) => this.mapMetricToDomain(m));
    }

    async uploadPhoto(photo: ProgressPhoto): Promise<ProgressPhoto> {
        const created = await this.prisma.progressPhoto.create({
            data: {
                id: photo.id,
                userId: photo.userId,
                imageUrl: photo.imageUrl,
                caption: photo.caption,
                loggedAt: photo.loggedAt,
            },
        });

        return this.mapPhotoToDomain(created);
    }

    async findUserPhotos(userId: string): Promise<ProgressPhoto[]> {
        const photos = await this.prisma.progressPhoto.findMany({
            where: { userId },
            orderBy: {
                loggedAt: 'desc',
            },
        });

        return photos.map((p) => this.mapPhotoToDomain(p));
    }

    async deletePhoto(photoId: string): Promise<void> {
        await this.prisma.progressPhoto.delete({
            where: { id: photoId },
        });
    }

    async findPhotoById(photoId: string): Promise<ProgressPhoto | null> {
        const photo = await this.prisma.progressPhoto.findUnique({
            where: { id: photoId },
        });

        return photo ? this.mapPhotoToDomain(photo) : null;
    }

    private mapMetricToDomain(raw: PrismaBodyMetric): BodyMetric {
        return new BodyMetric(
            raw.id,
            raw.userId,
            raw.weight,
            raw.height,
            raw.bodyFat,
            raw.measurements as Record<string, number> | null,
            raw.notes,
            raw.loggedAt,
        );
    }

    private mapPhotoToDomain(raw: PrismaProgressPhoto): ProgressPhoto {
        return new ProgressPhoto(
            raw.id,
            raw.userId,
            raw.imageUrl,
            raw.caption,
            raw.loggedAt,
        );
    }
}
