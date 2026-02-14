"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayExercise = void 0;
class DayExercise {
    id;
    dayId;
    exercise;
    order;
    customDescription;
    customVideoUrl;
    customImageUrl;
    coachNotes;
    targetSets;
    targetReps;
    targetRir;
    restSeconds;
    constructor(id, dayId, exercise, order, customDescription, customVideoUrl, customImageUrl, coachNotes, targetSets, targetReps, targetRir, restSeconds) {
        this.id = id;
        this.dayId = dayId;
        this.exercise = exercise;
        this.order = order;
        this.customDescription = customDescription;
        this.customVideoUrl = customVideoUrl;
        this.customImageUrl = customImageUrl;
        this.coachNotes = coachNotes;
        this.targetSets = targetSets;
        this.targetReps = targetReps;
        this.targetRir = targetRir;
        this.restSeconds = restSeconds;
    }
    get description() {
        return this.customDescription ?? this.exercise.description;
    }
    get videoUrl() {
        return this.customVideoUrl ?? this.exercise.defaultVideoUrl;
    }
    get imageUrl() {
        return this.customImageUrl ?? this.exercise.defaultImageUrl;
    }
    get thumbnailUrl() {
        return this.customImageUrl ?? this.exercise.thumbnailUrl ?? this.exercise.defaultImageUrl;
    }
}
exports.DayExercise = DayExercise;
//# sourceMappingURL=day-exercise.entity.js.map