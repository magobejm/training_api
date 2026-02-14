"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingDay = void 0;
class TrainingDay {
    id;
    name;
    order;
    planId;
    exercises;
    createdAt;
    updatedAt;
    constructor(id, name, order, planId, exercises, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.planId = planId;
        this.exercises = exercises;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TrainingDay = TrainingDay;
//# sourceMappingURL=training-day.entity.js.map