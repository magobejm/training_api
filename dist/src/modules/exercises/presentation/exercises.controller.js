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
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let ExercisesController = class ExercisesController {
    createExerciseUseCase;
    getExercisesUseCase;
    constructor(createExerciseUseCase, getExercisesUseCase) {
        this.createExerciseUseCase = createExerciseUseCase;
        this.getExercisesUseCase = getExercisesUseCase;
    }
    async create(dto, user) {
        return this.createExerciseUseCase.execute({ ...dto, userId: user.userId });
    }
    async findAll() {
        return this.getExercisesUseCase.execute();
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findAll", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_exercise_usecase_1.CreateExerciseUseCase,
        get_exercises_usecase_1.GetExercisesUseCase])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map