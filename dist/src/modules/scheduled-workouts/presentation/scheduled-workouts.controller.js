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
exports.ScheduledWorkoutsController = void 0;
const common_1 = require("@nestjs/common");
const scheduled_workouts_service_1 = require("../application/scheduled-workouts.service");
const scheduled_workout_dto_1 = require("./scheduled-workout.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let ScheduledWorkoutsController = class ScheduledWorkoutsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto, user) {
        return this.service.create({
            ...dto,
            trainerId: user.userId,
        });
    }
    async findAll(userId, from, to) {
        return this.service.findAll(userId, from ? new Date(from) : undefined, to ? new Date(to) : undefined);
    }
    async update(id, dto) {
        return this.service.update(id, dto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.ScheduledWorkoutsController = ScheduledWorkoutsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scheduled_workout_dto_1.CreateScheduledWorkoutDto, Object]),
    __metadata("design:returntype", Promise)
], ScheduledWorkoutsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ScheduledWorkoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, scheduled_workout_dto_1.UpdateScheduledWorkoutDto]),
    __metadata("design:returntype", Promise)
], ScheduledWorkoutsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduledWorkoutsController.prototype, "remove", null);
exports.ScheduledWorkoutsController = ScheduledWorkoutsController = __decorate([
    (0, common_1.Controller)('scheduled-workouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [scheduled_workouts_service_1.ScheduledWorkoutsService])
], ScheduledWorkoutsController);
//# sourceMappingURL=scheduled-workouts.controller.js.map