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
    muscleGroupDetails;
    constructor(id, name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, createdAt, updatedAt, createdBy, updatedBy, deletedAt, deletedBy, muscleGroupDetails) {
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
        this.muscleGroupDetails = muscleGroupDetails;
    }
    static create(name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, userId) {
        return new Exercise(crypto.randomUUID(), name, description, muscleGroup, defaultVideoUrl, defaultImageUrl, thumbnailUrl, new Date(), new Date(), userId, null, null, null, undefined);
    }
}
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.entity.js.map