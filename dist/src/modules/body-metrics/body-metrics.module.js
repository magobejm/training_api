"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMetricsModule = void 0;
const common_1 = require("@nestjs/common");
const body_metrics_controller_1 = require("./presentation/body-metrics.controller");
const log_body_metric_usecase_1 = require("./application/log-body-metric.usecase");
const get_body_metrics_history_usecase_1 = require("./application/get-body-metrics-history.usecase");
const upload_progress_photo_usecase_1 = require("./application/upload-progress-photo.usecase");
const get_progress_photos_usecase_1 = require("./application/get-progress-photos.usecase");
const delete_progress_photo_usecase_1 = require("./application/delete-progress-photo.usecase");
const prisma_body_metric_repository_1 = require("./infra/prisma-body-metric.repository");
const body_metric_repository_1 = require("./domain/body-metric.repository");
let BodyMetricsModule = class BodyMetricsModule {
};
exports.BodyMetricsModule = BodyMetricsModule;
exports.BodyMetricsModule = BodyMetricsModule = __decorate([
    (0, common_1.Module)({
        controllers: [body_metrics_controller_1.BodyMetricsController],
        providers: [
            log_body_metric_usecase_1.LogBodyMetricUseCase,
            get_body_metrics_history_usecase_1.GetBodyMetricsHistoryUseCase,
            upload_progress_photo_usecase_1.UploadProgressPhotoUseCase,
            get_progress_photos_usecase_1.GetProgressPhotosUseCase,
            delete_progress_photo_usecase_1.DeleteProgressPhotoUseCase,
            {
                provide: body_metric_repository_1.IBodyMetricRepository,
                useClass: prisma_body_metric_repository_1.PrismaBodyMetricRepository,
            },
        ],
        exports: [body_metric_repository_1.IBodyMetricRepository],
    })
], BodyMetricsModule);
//# sourceMappingURL=body-metrics.module.js.map