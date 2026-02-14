"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaBodyMetricRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const body_metric_entity_1 = require("../domain/body-metric.entity");
let PrismaBodyMetricRepository = class PrismaBodyMetricRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logMetric(metric) {
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
    async findUserMetrics(userId, filters) {
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
    async uploadPhoto(photo) {
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
    async findUserPhotos(userId) {
        const photos = await this.prisma.progressPhoto.findMany({
            where: { userId },
            orderBy: {
                loggedAt: 'desc',
            },
        });
        return photos.map((p) => this.mapPhotoToDomain(p));
    }
    async deletePhoto(photoId) {
        await this.prisma.progressPhoto.delete({
            where: { id: photoId },
        });
    }
    async findPhotoById(photoId) {
        const photo = await this.prisma.progressPhoto.findUnique({
            where: { id: photoId },
        });
        return photo ? this.mapPhotoToDomain(photo) : null;
    }
    mapMetricToDomain(raw) {
        return new body_metric_entity_1.BodyMetric(raw.id, raw.userId, raw.weight, raw.height, raw.bodyFat, raw.measurements, raw.notes, raw.loggedAt);
    }
    mapPhotoToDomain(raw) {
        return new body_metric_entity_1.ProgressPhoto(raw.id, raw.userId, raw.imageUrl, raw.caption, raw.loggedAt);
    }
};
exports.PrismaBodyMetricRepository = PrismaBodyMetricRepository;
exports.PrismaBodyMetricRepository = PrismaBodyMetricRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaBodyMetricRepository);
//# sourceMappingURL=prisma-body-metric.repository.js.map