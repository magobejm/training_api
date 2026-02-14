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
exports.SchedulingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const schedule_workout_usecase_1 = require("../application/schedule-workout.usecase");
const get_upcoming_schedule_usecase_1 = require("../application/get-upcoming-schedule.usecase");
const reschedule_workout_usecase_1 = require("../application/reschedule-workout.usecase");
const cancel_scheduled_workout_usecase_1 = require("../application/cancel-scheduled-workout.usecase");
const scheduling_dto_1 = require("./scheduling.dto");
let SchedulingController = class SchedulingController {
    scheduleWorkoutUseCase;
    getUpcomingUseCase;
    rescheduleUseCase;
    cancelUseCase;
    constructor(scheduleWorkoutUseCase, getUpcomingUseCase, rescheduleUseCase, cancelUseCase) {
        this.scheduleWorkoutUseCase = scheduleWorkoutUseCase;
        this.getUpcomingUseCase = getUpcomingUseCase;
        this.rescheduleUseCase = rescheduleUseCase;
        this.cancelUseCase = cancelUseCase;
    }
    async scheduleWorkout(dto, user) {
        const targetUserId = dto.clientId || user.userId;
        const targetTrainerId = dto.trainerId || (user.role === 'TRAINER' ? user.userId : dto.trainerId);
        const workout = await this.scheduleWorkoutUseCase.execute({
            userId: targetUserId,
            trainerId: targetTrainerId,
            trainingDayId: dto.trainingDayId,
            scheduledFor: new Date(dto.scheduledFor),
            notes: dto.notes,
        });
        return {
            id: workout.id,
            trainerId: workout.trainerId,
            trainingDayId: workout.trainingDayId,
            scheduledFor: workout.scheduledFor,
            completed: workout.completed,
            reminderSent: workout.reminderSent,
            notes: workout.notes,
        };
    }
    async getUpcoming(query, userId) {
        const workouts = await this.getUpcomingUseCase.execute({
            userId,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });
        return {
            workouts: workouts.map((w) => ({
                id: w.id,
                trainerId: w.trainerId,
                trainingDayId: w.trainingDayId,
                scheduledFor: w.scheduledFor,
                completed: w.completed,
                reminderSent: w.reminderSent,
                notes: w.notes,
            })),
            total: workouts.length,
        };
    }
    async reschedule(workoutId, dto, userId) {
        const workout = await this.rescheduleUseCase.execute({
            scheduledWorkoutId: workoutId,
            newDate: new Date(dto.newDate),
            userId,
        });
        return {
            id: workout.id,
            scheduledFor: workout.scheduledFor,
        };
    }
    async cancel(workoutId, userId) {
        await this.cancelUseCase.execute({
            scheduledWorkoutId: workoutId,
            userId,
        });
        return { message: 'Scheduled workout cancelled successfully' };
    }
};
exports.SchedulingController = SchedulingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scheduling_dto_1.ScheduleWorkoutDto, Object]),
    __metadata("design:returntype", Promise)
], SchedulingController.prototype, "scheduleWorkout", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [scheduling_dto_1.GetScheduleQueryDto, String]),
    __metadata("design:returntype", Promise)
], SchedulingController.prototype, "getUpcoming", null);
__decorate([
    (0, common_1.Patch)(':workoutId'),
    __param(0, (0, common_1.Param)('workoutId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, scheduling_dto_1.RescheduleWorkoutDto, String]),
    __metadata("design:returntype", Promise)
], SchedulingController.prototype, "reschedule", null);
__decorate([
    (0, common_1.Delete)(':workoutId'),
    __param(0, (0, common_1.Param)('workoutId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SchedulingController.prototype, "cancel", null);
exports.SchedulingController = SchedulingController = __decorate([
    (0, common_1.Controller)('scheduled-workouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [schedule_workout_usecase_1.ScheduleWorkoutUseCase,
        get_upcoming_schedule_usecase_1.GetUpcomingScheduleUseCase,
        reschedule_workout_usecase_1.RescheduleWorkoutUseCase,
        cancel_scheduled_workout_usecase_1.CancelScheduledWorkoutUseCase])
], SchedulingController);
//# sourceMappingURL=scheduling.controller.js.map