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
exports.GetConsultationsQueryDto = exports.SendMessageDto = exports.CreateConsultationDto = void 0;
const class_validator_1 = require("class-validator");
const consultation_entity_1 = require("../domain/consultation.entity");
class CreateConsultationDto {
    trainerId;
    subject;
    priority;
}
exports.CreateConsultationDto = CreateConsultationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "trainerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(consultation_entity_1.Priority),
    __metadata("design:type", String)
], CreateConsultationDto.prototype, "priority", void 0);
class SendMessageDto {
    content;
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], SendMessageDto.prototype, "content", void 0);
class GetConsultationsQueryDto {
    status;
}
exports.GetConsultationsQueryDto = GetConsultationsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['OPEN', 'RESOLVED']),
    __metadata("design:type", String)
], GetConsultationsQueryDto.prototype, "status", void 0);
//# sourceMappingURL=consultations.dto.js.map