"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledWorkout = void 0;
class ScheduledWorkout {
    id;
    userId;
    trainerId;
    trainingDayId;
    scheduledFor;
    reminderSent;
    completed;
    notes;
    createdAt;
    updatedAt;
    clientName;
    planName;
    dayName;
    constructor(id, userId, trainerId, trainingDayId, scheduledFor, reminderSent, completed, notes, createdAt, updatedAt, clientName, planName, dayName) {
        this.id = id;
        this.userId = userId;
        this.trainerId = trainerId;
        this.trainingDayId = trainingDayId;
        this.scheduledFor = scheduledFor;
        this.reminderSent = reminderSent;
        this.completed = completed;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientName = clientName;
        this.planName = planName;
        this.dayName = dayName;
    }
    static create(userId, trainerId, trainingDayId, scheduledFor, notes) {
        return new ScheduledWorkout(crypto.randomUUID(), userId, trainerId, trainingDayId, scheduledFor, false, false, notes || null, new Date(), new Date());
    }
    reschedule(newDate) {
        return new ScheduledWorkout(this.id, this.userId, this.trainerId, this.trainingDayId, newDate, this.reminderSent, this.completed, this.notes, this.createdAt, new Date(), this.clientName, this.planName, this.dayName);
    }
}
exports.ScheduledWorkout = ScheduledWorkout;
//# sourceMappingURL=scheduled-workout.entity.js.map