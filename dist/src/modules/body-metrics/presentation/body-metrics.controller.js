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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMetricsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const log_body_metric_usecase_1 = require("../application/log-body-metric.usecase");
const get_body_metrics_history_usecase_1 = require("../application/get-body-metrics-history.usecase");
const upload_progress_photo_usecase_1 = require("../application/upload-progress-photo.usecase");
const get_progress_photos_usecase_1 = require("../application/get-progress-photos.usecase");
const delete_progress_photo_usecase_1 = require("../application/delete-progress-photo.usecase");
const body_metrics_dto_1 = require("./body-metrics.dto");
let BodyMetricsController = class BodyMetricsController {
    logMetricUseCase;
    getHistoryUseCase;
    uploadPhotoUseCase;
    getPhotosUseCase;
    deletePhotoUseCase;
    constructor(logMetricUseCase, getHistoryUseCase, uploadPhotoUseCase, getPhotosUseCase, deletePhotoUseCase) {
        this.logMetricUseCase = logMetricUseCase;
        this.getHistoryUseCase = getHistoryUseCase;
        this.uploadPhotoUseCase = uploadPhotoUseCase;
        this.getPhotosUseCase = getPhotosUseCase;
        this.deletePhotoUseCase = deletePhotoUseCase;
    }
    async logMetric(dto, userId) {
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
    async getHistory(query, userId) {
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
    async uploadPhoto(dto, userId) {
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
    async getPhotos(userId) {
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
    async deletePhoto(photoId, userId) {
        await this.deletePhotoUseCase.execute({ photoId, userId });
        return { message: 'Photo deleted successfully' };
    }
};
exports.BodyMetricsController = BodyMetricsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [body_metrics_dto_1.LogMetricDto, String]),
    __metadata("design:returntype", Promise)
], BodyMetricsController.prototype, "logMetric", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [body_metrics_dto_1.GetMetricsQueryDto, String]),
    __metadata("design:returntype", Promise)
], BodyMetricsController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)('photos'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [body_metrics_dto_1.UploadPhotoDto, String]),
    __metadata("design:returntype", Promise)
], BodyMetricsController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)('photos'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BodyMetricsController.prototype, "getPhotos", null);
__decorate([
    (0, common_1.Delete)('photos/:photoId'),
    __param(0, (0, common_1.Param)('photoId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BodyMetricsController.prototype, "deletePhoto", null);
exports.BodyMetricsController = BodyMetricsController = __decorate([
    (0, common_1.Controller)('body-metrics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [log_body_metric_usecase_1.LogBodyMetricUseCase,
        get_body_metrics_history_usecase_1.GetBodyMetricsHistoryUseCase,
        upload_progress_photo_usecase_1.UploadProgressPhotoUseCase,
        get_progress_photos_usecase_1.GetProgressPhotosUseCase,
        delete_progress_photo_usecase_1.DeleteProgressPhotoUseCase])
], BodyMetricsController);
//# sourceMappingURL=body-metrics.controller.js.map