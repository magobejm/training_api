"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressPhoto = exports.BodyMetric = void 0;
class BodyMetric {
    id;
    userId;
    weight;
    height;
    bodyFat;
    measurements;
    notes;
    loggedAt;
    constructor(id, userId, weight, height, bodyFat, measurements, notes, loggedAt) {
        this.id = id;
        this.userId = userId;
        this.weight = weight;
        this.height = height;
        this.bodyFat = bodyFat;
        this.measurements = measurements;
        this.notes = notes;
        this.loggedAt = loggedAt;
    }
    static create(userId, weight, height, bodyFat, measurements, notes) {
        return new BodyMetric(crypto.randomUUID(), userId, weight, height || null, bodyFat || null, measurements || null, notes || null, new Date());
    }
}
exports.BodyMetric = BodyMetric;
class ProgressPhoto {
    id;
    userId;
    imageUrl;
    caption;
    loggedAt;
    constructor(id, userId, imageUrl, caption, loggedAt) {
        this.id = id;
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.loggedAt = loggedAt;
    }
    static create(userId, imageUrl, caption) {
        return new ProgressPhoto(crypto.randomUUID(), userId, imageUrl, caption || null, new Date());
    }
}
exports.ProgressPhoto = ProgressPhoto;
//# sourceMappingURL=body-metric.entity.js.map