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
exports.UpdateExerciseDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateExerciseDto {
    name;
    description;
    muscleGroup;
    videoUrl;
    imageUrl;
    defaultImageUrl;
    thumbnailUrl;
}
exports.UpdateExerciseDto = UpdateExerciseDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'El nombre no puede exceder 100 caracteres' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500, { message: 'La descripción no puede exceder 500 caracteres' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "muscleGroup", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'El URL del video debe ser válido' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "videoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'El URL de la imagen debe ser válido' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'El URL de la imagen por defecto debe ser válido' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "defaultImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'El URL de la miniatura debe ser válido' }),
    __metadata("design:type", String)
], UpdateExerciseDto.prototype, "thumbnailUrl", void 0);
//# sourceMappingURL=update-exercise.dto.js.map