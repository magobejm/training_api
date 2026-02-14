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
exports.DeleteProgressPhotoUseCase = void 0;
const common_1 = require("@nestjs/common");
const body_metric_repository_1 = require("../domain/body-metric.repository");
let DeleteProgressPhotoUseCase = class DeleteProgressPhotoUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const photo = await this.repository.findPhotoById(command.photoId);
        if (!photo) {
            throw new common_1.NotFoundException('Photo not found');
        }
        if (photo.userId !== command.userId) {
            throw new common_1.ForbiddenException('You can only delete your own photos');
        }
        await this.repository.deletePhoto(command.photoId);
    }
};
exports.DeleteProgressPhotoUseCase = DeleteProgressPhotoUseCase;
exports.DeleteProgressPhotoUseCase = DeleteProgressPhotoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(body_metric_repository_1.IBodyMetricRepository)),
    __metadata("design:paramtypes", [Object])
], DeleteProgressPhotoUseCase);
//# sourceMappingURL=delete-progress-photo.usecase.js.map