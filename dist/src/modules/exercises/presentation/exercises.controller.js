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
exports.ExercisesController = void 0;
const common_1 = require("@nestjs/common");
const create_exercise_usecase_1 = require("../application/create-exercise.usecase");
const get_exercises_usecase_1 = require("../application/get-exercises.usecase");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const create_exercise_dto_1 = require("./create-exercise.dto");
const update_exercise_dto_1 = require("./update-exercise.dto");
const get_exercise_by_id_usecase_1 = require("../application/get-exercise-by-id.usecase");
const update_exercise_usecase_1 = require("../application/update-exercise.usecase");
const delete_exercise_usecase_1 = require("../application/delete-exercise.usecase");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let ExercisesController = class ExercisesController {
    createExerciseUseCase;
    getExercisesUseCase;
    getExerciseByIdUseCase;
    updateExerciseUseCase;
    deleteExerciseUseCase;
    constructor(createExerciseUseCase, getExercisesUseCase, getExerciseByIdUseCase, updateExerciseUseCase, deleteExerciseUseCase) {
        this.createExerciseUseCase = createExerciseUseCase;
        this.getExercisesUseCase = getExercisesUseCase;
        this.getExerciseByIdUseCase = getExerciseByIdUseCase;
        this.updateExerciseUseCase = updateExerciseUseCase;
        this.deleteExerciseUseCase = deleteExerciseUseCase;
    }
    async create(dto, user) {
        return this.createExerciseUseCase.execute({
            name: dto.name,
            description: dto.description,
            muscleGroup: dto.muscleGroup,
            videoUrl: dto.defaultVideoUrl || undefined,
            imageUrl: dto.defaultImageUrl || undefined,
            thumbnailUrl: dto.thumbnailUrl || undefined,
            userId: user.userId,
        });
    }
    async findAll(user) {
        return this.getExercisesUseCase.execute(user.userId);
    }
    async findOne(id) {
        return this.getExerciseByIdUseCase.execute(id);
    }
    async update(id, dto, user) {
        return this.updateExerciseUseCase.execute({
            id,
            data: dto,
            userId: user.userId,
        });
    }
    async remove(id, user) {
        return this.deleteExerciseUseCase.execute({
            id,
            userId: user.userId,
        });
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_dto_1.CreateExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exercise_dto_1.UpdateExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "remove", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_exercise_usecase_1.CreateExerciseUseCase,
        get_exercises_usecase_1.GetExercisesUseCase,
        get_exercise_by_id_usecase_1.GetExerciseByIdUseCase,
        update_exercise_usecase_1.UpdateExerciseUseCase,
        delete_exercise_usecase_1.DeleteExerciseUseCase])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map