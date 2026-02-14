"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSession = exports.WorkoutSet = exports.SessionStatus = void 0;
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["IN_PROGRESS"] = "IN_PROGRESS";
    SessionStatus["COMPLETED"] = "COMPLETED";
    SessionStatus["ABANDONED"] = "ABANDONED";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
class WorkoutSet {
    id;
    sessionId;
    dayExerciseId;
    setIndex;
    weightDone;
    repsDone;
    rpeDone;
    restStartedAt;
    restCompletedAt;
    createdAt;
    constructor(id, sessionId, dayExerciseId, setIndex, weightDone, repsDone, rpeDone, restStartedAt, restCompletedAt, createdAt) {
        this.id = id;
        this.sessionId = sessionId;
        this.dayExerciseId = dayExerciseId;
        this.setIndex = setIndex;
        this.weightDone = weightDone;
        this.repsDone = repsDone;
        this.rpeDone = rpeDone;
        this.restStartedAt = restStartedAt;
        this.restCompletedAt = restCompletedAt;
        this.createdAt = createdAt;
    }
    get volume() {
        return this.weightDone * this.repsDone;
    }
    static create(sessionId, dayExerciseId, setIndex, weightDone, repsDone, rpeDone) {
        return new WorkoutSet(crypto.randomUUID(), sessionId, dayExerciseId, setIndex, weightDone, repsDone, rpeDone || null, null, null, new Date());
    }
}
exports.WorkoutSet = WorkoutSet;
class WorkoutSession {
    id;
    userId;
    trainingDayId;
    status;
    startedAt;
    completedAt;
    sets;
    createdAt;
    updatedAt;
    constructor(id, userId, trainingDayId, status, startedAt, completedAt, sets, createdAt, updatedAt) {
        this.id = id;
        this.userId = userId;
        this.trainingDayId = trainingDayId;
        this.status = status;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.sets = sets;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get totalVolume() {
        return this.sets.reduce((sum, set) => sum + set.volume, 0);
    }
    get durationSeconds() {
        if (!this.completedAt)
            return null;
        return Math.floor((this.completedAt.getTime() - this.startedAt.getTime()) / 1000);
    }
    static start(userId, trainingDayId) {
        return new WorkoutSession(crypto.randomUUID(), userId, trainingDayId, SessionStatus.IN_PROGRESS, new Date(), null, [], new Date(), new Date());
    }
    complete() {
        return new WorkoutSession(this.id, this.userId, this.trainingDayId, SessionStatus.COMPLETED, this.startedAt, new Date(), this.sets, this.createdAt, new Date());
    }
}
exports.WorkoutSession = WorkoutSession;
//# sourceMappingURL=workout-session.entity.js.map