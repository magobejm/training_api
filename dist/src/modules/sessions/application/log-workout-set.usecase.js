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
exports.LogWorkoutSetUseCase = void 0;
const common_1 = require("@nestjs/common");
const session_repository_1 = require("../domain/session.repository");
const workout_session_entity_1 = require("../domain/workout-session.entity");
let LogWorkoutSetUseCase = class LogWorkoutSetUseCase {
    sessionRepository;
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async execute(command) {
        const session = await this.sessionRepository.findSessionById(command.sessionId);
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        if (session.userId !== command.userId) {
            throw new common_1.ForbiddenException('You can only log sets for your own sessions');
        }
        if (session.status !== workout_session_entity_1.SessionStatus.IN_PROGRESS) {
            throw new common_1.ForbiddenException('Cannot log sets to a completed session');
        }
        const workoutSet = workout_session_entity_1.WorkoutSet.create(command.sessionId, command.dayExerciseId, command.setIndex, command.weightDone, command.repsDone, command.rpeDone);
        return this.sessionRepository.addSetToSession(workoutSet);
    }
};
exports.LogWorkoutSetUseCase = LogWorkoutSetUseCase;
exports.LogWorkoutSetUseCase = LogWorkoutSetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(session_repository_1.ISessionRepository)),
    __metadata("design:paramtypes", [Object])
], LogWorkoutSetUseCase);
//# sourceMappingURL=log-workout-set.usecase.js.map