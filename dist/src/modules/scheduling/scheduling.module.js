"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const scheduling_controller_1 = require("./presentation/scheduling.controller");
const schedule_workout_usecase_1 = require("./application/schedule-workout.usecase");
const get_upcoming_schedule_usecase_1 = require("./application/get-upcoming-schedule.usecase");
const reschedule_workout_usecase_1 = require("./application/reschedule-workout.usecase");
const cancel_scheduled_workout_usecase_1 = require("./application/cancel-scheduled-workout.usecase");
const prisma_scheduling_repository_1 = require("./infra/prisma-scheduling.repository");
const scheduling_repository_1 = require("./domain/scheduling.repository");
let SchedulingModule = class SchedulingModule {
};
exports.SchedulingModule = SchedulingModule;
exports.SchedulingModule = SchedulingModule = __decorate([
    (0, common_1.Module)({
        controllers: [scheduling_controller_1.SchedulingController],
        providers: [
            schedule_workout_usecase_1.ScheduleWorkoutUseCase,
            get_upcoming_schedule_usecase_1.GetUpcomingScheduleUseCase,
            reschedule_workout_usecase_1.RescheduleWorkoutUseCase,
            cancel_scheduled_workout_usecase_1.CancelScheduledWorkoutUseCase,
            {
                provide: scheduling_repository_1.ISchedulingRepository,
                useClass: prisma_scheduling_repository_1.PrismaSchedulingRepository,
            },
        ],
        exports: [scheduling_repository_1.ISchedulingRepository],
    })
], SchedulingModule);
//# sourceMappingURL=scheduling.module.js.map