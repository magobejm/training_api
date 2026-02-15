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
exports.RescheduleWorkoutUseCase = void 0;
const common_1 = require("@nestjs/common");
const scheduling_repository_1 = require("../domain/scheduling.repository");
let RescheduleWorkoutUseCase = class RescheduleWorkoutUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const workout = await this.repository.findById(command.scheduledWorkoutId);
        if (!workout) {
            throw new common_1.NotFoundException('Scheduled workout not found');
        }
        if (workout.userId !== command.userId && workout.trainerId !== command.userId) {
            throw new common_1.ForbiddenException('You can only reschedule your own workouts or those you manage');
        }
        const hasOverlap = await this.repository.hasOverlap(workout.userId, command.newDate, workout.id);
        if (hasOverlap) {
            throw new common_1.ForbiddenException('The client already has a session scheduled at this time');
        }
        const rescheduled = workout.reschedule(command.newDate);
        return this.repository.updateScheduledWorkout(rescheduled);
    }
};
exports.RescheduleWorkoutUseCase = RescheduleWorkoutUseCase;
exports.RescheduleWorkoutUseCase = RescheduleWorkoutUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(scheduling_repository_1.ISchedulingRepository)),
    __metadata("design:paramtypes", [Object])
], RescheduleWorkoutUseCase);
//# sourceMappingURL=reschedule-workout.usecase.js.map