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
exports.GetHistoryQueryDto = exports.LogSetDto = exports.StartSessionDto = void 0;
const class_validator_1 = require("class-validator");
class StartSessionDto {
    trainingDayId;
}
exports.StartSessionDto = StartSessionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartSessionDto.prototype, "trainingDayId", void 0);
class LogSetDto {
    dayExerciseId;
    setIndex;
    weightDone;
    repsDone;
    rpeDone;
}
exports.LogSetDto = LogSetDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LogSetDto.prototype, "dayExerciseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LogSetDto.prototype, "setIndex", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LogSetDto.prototype, "weightDone", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LogSetDto.prototype, "repsDone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], LogSetDto.prototype, "rpeDone", void 0);
class GetHistoryQueryDto {
    status;
    startDate;
    endDate;
}
exports.GetHistoryQueryDto = GetHistoryQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['IN_PROGRESS', 'COMPLETED', 'ABANDONED']),
    __metadata("design:type", String)
], GetHistoryQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetHistoryQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetHistoryQueryDto.prototype, "endDate", void 0);
//# sourceMappingURL=sessions.dto.js.map