"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingPlan = void 0;
class TrainingPlan {
    id;
    name;
    description;
    authorId;
    days;
    createdAt;
    updatedAt;
    constructor(id, name, description, authorId, days, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.authorId = authorId;
        this.days = days;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(name, description, authorId) {
        return new TrainingPlan(crypto.randomUUID(), name, description, authorId, [], new Date(), new Date());
    }
}
exports.TrainingPlan = TrainingPlan;
//# sourceMappingURL=training-plan.entity.js.map