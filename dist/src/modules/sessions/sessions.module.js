"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const common_1 = require("@nestjs/common");
const sessions_controller_1 = require("./presentation/sessions.controller");
const start_workout_session_usecase_1 = require("./application/start-workout-session.usecase");
const log_workout_set_usecase_1 = require("./application/log-workout-set.usecase");
const complete_workout_session_usecase_1 = require("./application/complete-workout-session.usecase");
const get_workout_session_usecase_1 = require("./application/get-workout-session.usecase");
const get_workout_history_usecase_1 = require("./application/get-workout-history.usecase");
const prisma_session_repository_1 = require("./infra/prisma-session.repository");
const session_repository_1 = require("./domain/session.repository");
let SessionsModule = class SessionsModule {
};
exports.SessionsModule = SessionsModule;
exports.SessionsModule = SessionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sessions_controller_1.SessionsController],
        providers: [
            start_workout_session_usecase_1.StartWorkoutSessionUseCase,
            log_workout_set_usecase_1.LogWorkoutSetUseCase,
            complete_workout_session_usecase_1.CompleteWorkoutSessionUseCase,
            get_workout_session_usecase_1.GetWorkoutSessionUseCase,
            get_workout_history_usecase_1.GetWorkoutHistoryUseCase,
            {
                provide: session_repository_1.ISessionRepository,
                useClass: prisma_session_repository_1.PrismaSessionRepository,
            },
        ],
        exports: [session_repository_1.ISessionRepository],
    })
], SessionsModule);
//# sourceMappingURL=sessions.module.js.map