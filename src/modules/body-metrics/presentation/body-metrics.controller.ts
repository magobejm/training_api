import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { LogBodyMetricUseCase } from '../application/log-body-metric.usecase';
import { GetBodyMetricsHistoryUseCase } from '../application/get-body-metrics-history.usecase';
import { UploadProgressPhotoUseCase } from '../application/upload-progress-photo.usecase';
import { GetProgressPhotosUseCase } from '../application/get-progress-photos.usecase';
import { DeleteProgressPhotoUseCase } from '../application/delete-progress-photo.usecase';
import {
    LogMetricDto,
    UploadPhotoDto,
    GetMetricsQueryDto,
} from './body-metrics.dto';

@Controller('body-metrics')
@UseGuards(JwtAuthGuard)
export class BodyMetricsController {
    constructor(
        private readonly logMetricUseCase: LogBodyMetricUseCase,
        private readonly getHistoryUseCase: GetBodyMetricsHistoryUseCase,
        private readonly uploadPhotoUseCase: UploadProgressPhotoUseCase,
        private readonly getPhotosUseCase: GetProgressPhotosUseCase,
        private readonly deletePhotoUseCase: DeleteProgressPhotoUseCase,
    ) { }

    @Post()
    async logMetric(
        @Body() dto: LogMetricDto,
        @CurrentUser('sub') userId: string,
    ) {
        const metric = await this.logMetricUseCase.execute({
            userId,
            weight: dto.weight,
            height: dto.height,
            bodyFat: dto.bodyFat,
            measurements: dto.measurements,
            notes: dto.notes,
        });

        return {
            id: metric.id,
            weight: metric.weight,
            height: metric.height,
            bodyFat: metric.bodyFat,
            measurements: metric.measurements,
            notes: metric.notes,
            loggedAt: metric.loggedAt,
        };
    }

    @Get()
    async getHistory(
        @Query() query: GetMetricsQueryDto,
        @CurrentUser('sub') userId: string,
    ) {
        const metrics = await this.getHistoryUseCase.execute({
            userId,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });

        return {
            metrics: metrics.map((m) => ({
                id: m.id,
                weight: m.weight,
                height: m.height,
                bodyFat: m.bodyFat,
                measurements: m.measurements,
                notes: m.notes,
                loggedAt: m.loggedAt,
            })),
            total: metrics.length,
        };
    }

    @Post('photos')
    async uploadPhoto(
        @Body() dto: UploadPhotoDto,
        @CurrentUser('sub') userId: string,
    ) {
        const photo = await this.uploadPhotoUseCase.execute({
            userId,
            imageUrl: dto.imageUrl,
            caption: dto.caption,
        });

        return {
            id: photo.id,
            imageUrl: photo.imageUrl,
            caption: photo.caption,
            loggedAt: photo.loggedAt,
        };
    }

    @Get('photos')
    async getPhotos(@CurrentUser('sub') userId: string) {
        const photos = await this.getPhotosUseCase.execute({ userId });

        return {
            photos: photos.map((p) => ({
                id: p.id,
                imageUrl: p.imageUrl,
                caption: p.caption,
                loggedAt: p.loggedAt,
            })),
            total: photos.length,
        };
    }

    @Delete('photos/:photoId')
    async deletePhoto(
        @Param('photoId') photoId: string,
        @CurrentUser('sub') userId: string,
    ) {
        await this.deletePhotoUseCase.execute({ photoId, userId });
        return { message: 'Photo deleted successfully' };
    }
}
