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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const create_training_plan_usecase_1 = require("../application/create-training-plan.usecase");
const get_training_plan_usecase_1 = require("../application/get-training-plan.usecase");
const get_training_plans_usecase_1 = require("../application/get-training-plans.usecase");
const add_exercise_to_day_usecase_1 = require("../application/add-exercise-to-day.usecase");
const add_day_to_plan_usecase_1 = require("../application/add-day-to-plan.usecase");
const delete_training_plan_usecase_1 = require("../application/delete-training-plan.usecase");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateDayExerciseDto {
    exerciseId;
    order;
    targetSets;
    targetReps;
    targetRir;
    restSeconds;
    customDescription;
    customVideoUrl;
    customImageUrl;
    coachNotes;
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "exerciseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateDayExerciseDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateDayExerciseDto.prototype, "targetSets", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "targetReps", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDayExerciseDto.prototype, "targetRir", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDayExerciseDto.prototype, "restSeconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "customDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "customVideoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "customImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDayExerciseDto.prototype, "coachNotes", void 0);
class CreateDayDto {
    name;
    order;
    exercises;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDayDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateDayDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateDayExerciseDto),
    __metadata("design:type", Array)
], CreateDayDto.prototype, "exercises", void 0);
class CreatePlanDto {
    name;
    description;
    days;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateDayDto),
    __metadata("design:type", Array)
], CreatePlanDto.prototype, "days", void 0);
class AddExerciseDto {
    exerciseId;
    order;
    targetSets;
    targetReps;
    targetRir;
    restSeconds;
    customDescription;
    customVideoUrl;
    customImageUrl;
    coachNotes;
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "exerciseId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddExerciseDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddExerciseDto.prototype, "targetSets", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "targetReps", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AddExerciseDto.prototype, "targetRir", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AddExerciseDto.prototype, "restSeconds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "customDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "customVideoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "customImageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddExerciseDto.prototype, "coachNotes", void 0);
let TrainingController = class TrainingController {
    createPlanUseCase;
    getPlanUseCase;
    getPlansUseCase;
    addDayUseCase;
    addExerciseUseCase;
    deletePlanUseCase;
    constructor(createPlanUseCase, getPlanUseCase, getPlansUseCase, addDayUseCase, addExerciseUseCase, deletePlanUseCase) {
        this.createPlanUseCase = createPlanUseCase;
        this.getPlanUseCase = getPlanUseCase;
        this.getPlansUseCase = getPlansUseCase;
        this.addDayUseCase = addDayUseCase;
        this.addExerciseUseCase = addExerciseUseCase;
        this.deletePlanUseCase = deletePlanUseCase;
    }
    async createPlan(dto, user) {
        return this.createPlanUseCase.execute({ ...dto, authorId: user.userId });
    }
    async getPlans(user) {
        return this.getPlansUseCase.execute(user.userId);
    }
    async getPlan(id) {
        const plan = await this.getPlanUseCase.execute(id);
        if (!plan)
            throw new common_1.NotFoundException('Plan not found');
        return plan;
    }
    async deletePlan(id, user) {
        return this.deletePlanUseCase.execute({
            id,
            userId: user.userId,
        });
    }
    async createDay(planId, dto, user) {
        return this.addDayUseCase.execute({
            planId,
            ...dto,
            userId: user.userId,
        });
    }
    async addExercise(planId, dayId, dto, user) {
        return this.addExerciseUseCase.execute({
            dayId,
            ...dto,
            targetRir: dto.targetRir ?? null,
            userId: user.userId,
        });
    }
};
exports.TrainingController = TrainingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePlanDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getPlan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "deletePlan", null);
__decorate([
    (0, common_1.Post)(':id/days'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateDayDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "createDay", null);
__decorate([
    (0, common_1.Post)(':planId/days/:dayId/exercises'),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Param)('dayId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, AddExerciseDto, Object]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "addExercise", null);
exports.TrainingController = TrainingController = __decorate([
    (0, common_1.Controller)('training-plans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_training_plan_usecase_1.CreateTrainingPlanUseCase,
        get_training_plan_usecase_1.GetTrainingPlanUseCase,
        get_training_plans_usecase_1.GetTrainingPlansUseCase,
        add_day_to_plan_usecase_1.AddDayToPlanUseCase,
        add_exercise_to_day_usecase_1.AddExerciseToDayUseCase,
        delete_training_plan_usecase_1.DeleteTrainingPlanUseCase])
], TrainingController);
//# sourceMappingURL=training.controller.js.map