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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const start_workout_session_usecase_1 = require("../application/start-workout-session.usecase");
const log_workout_set_usecase_1 = require("../application/log-workout-set.usecase");
const complete_workout_session_usecase_1 = require("../application/complete-workout-session.usecase");
const get_workout_session_usecase_1 = require("../application/get-workout-session.usecase");
const get_workout_history_usecase_1 = require("../application/get-workout-history.usecase");
const sessions_dto_1 = require("./sessions.dto");
let SessionsController = class SessionsController {
    startSessionUseCase;
    logSetUseCase;
    completeSessionUseCase;
    getSessionUseCase;
    getHistoryUseCase;
    constructor(startSessionUseCase, logSetUseCase, completeSessionUseCase, getSessionUseCase, getHistoryUseCase) {
        this.startSessionUseCase = startSessionUseCase;
        this.logSetUseCase = logSetUseCase;
        this.completeSessionUseCase = completeSessionUseCase;
        this.getSessionUseCase = getSessionUseCase;
        this.getHistoryUseCase = getHistoryUseCase;
    }
    async startSession(dto, userId) {
        const session = await this.startSessionUseCase.execute({
            userId,
            trainingDayId: dto.trainingDayId,
        });
        return {
            id: session.id,
            userId: session.userId,
            trainingDayId: session.trainingDayId,
            status: session.status,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
            sets: session.sets.map((s) => ({
                id: s.id,
                dayExerciseId: s.dayExerciseId,
                setIndex: s.setIndex,
                weightDone: s.weightDone,
                repsDone: s.repsDone,
                rpeDone: s.rpeDone,
                volume: s.volume,
            })),
        };
    }
    async logSet(sessionId, dto, userId) {
        const set = await this.logSetUseCase.execute({
            sessionId,
            dayExerciseId: dto.dayExerciseId,
            setIndex: dto.setIndex,
            weightDone: dto.weightDone,
            repsDone: dto.repsDone,
            rpeDone: dto.rpeDone,
            userId,
        });
        return {
            id: set.id,
            sessionId: set.sessionId,
            dayExerciseId: set.dayExerciseId,
            setIndex: set.setIndex,
            weightDone: set.weightDone,
            repsDone: set.repsDone,
            rpeDone: set.rpeDone,
            volume: set.volume,
            createdAt: set.createdAt,
        };
    }
    async completeSession(sessionId, userId) {
        const session = await this.completeSessionUseCase.execute({
            sessionId,
            userId,
        });
        return {
            id: session.id,
            status: session.status,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
        };
    }
    async getSession(sessionId, userId) {
        const session = await this.getSessionUseCase.execute({
            sessionId,
            userId,
        });
        return {
            id: session.id,
            userId: session.userId,
            trainingDayId: session.trainingDayId,
            status: session.status,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
            sets: session.sets.map((s) => ({
                id: s.id,
                dayExerciseId: s.dayExerciseId,
                setIndex: s.setIndex,
                weightDone: s.weightDone,
                repsDone: s.repsDone,
                rpeDone: s.rpeDone,
                volume: s.volume,
                createdAt: s.createdAt,
            })),
        };
    }
    async getHistory(query, userId) {
        const sessions = await this.getHistoryUseCase.execute({
            userId,
            status: query.status,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });
        return {
            sessions: sessions.map((s) => ({
                id: s.id,
                trainingDayId: s.trainingDayId,
                status: s.status,
                startedAt: s.startedAt,
                completedAt: s.completedAt,
                totalVolume: s.totalVolume,
                durationSeconds: s.durationSeconds,
                setsCount: s.sets.length,
            })),
            total: sessions.length,
        };
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_dto_1.StartSessionDto, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)(':sessionId/sets'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sessions_dto_1.LogSetDto, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "logSet", null);
__decorate([
    (0, common_1.Patch)(':sessionId/complete'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "completeSession", null);
__decorate([
    (0, common_1.Get)(':sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getSession", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sessions_dto_1.GetHistoryQueryDto, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "getHistory", null);
exports.SessionsController = SessionsController = __decorate([
    (0, common_1.Controller)('sessions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [start_workout_session_usecase_1.StartWorkoutSessionUseCase,
        log_workout_set_usecase_1.LogWorkoutSetUseCase,
        complete_workout_session_usecase_1.CompleteWorkoutSessionUseCase,
        get_workout_session_usecase_1.GetWorkoutSessionUseCase,
        get_workout_history_usecase_1.GetWorkoutHistoryUseCase])
], SessionsController);
//# sourceMappingURL=sessions.controller.js.map