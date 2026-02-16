"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
class Exercise {
    id;
    name;
    description;
    muscleGroup;
    defaultVideoUrl;
    defaultImageUrl;
    thumbnailUrl;
    createdAt;
    updatedAt;
    createdBy;
    updatedBy;
    deletedAt;
    deletedBy;
    trainerId;
    muscleGroupDetails;
    constructor(id, name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, createdAt, updatedAt, createdBy, updatedBy, deletedAt, deletedBy, trainerId, muscleGroupDetails) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.muscleGroup = muscleGroup;
        this.defaultVideoUrl = defaultVideoUrl;
        this.defaultImageUrl = defaultImageUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedAt = deletedAt;
        this.deletedBy = deletedBy;
        this.trainerId = trainerId;
        this.muscleGroupDetails = muscleGroupDetails;
    }
    static create(name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, userId, trainerId = null) {
        return new Exercise(crypto.randomUUID(), name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, new Date(), new Date(), userId, null, null, null, trainerId, undefined);
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.entity.js.map