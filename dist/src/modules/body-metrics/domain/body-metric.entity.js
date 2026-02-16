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
    waist;
    hips;
    chest;
    arm;
    leg;
    constructor(id, userId, weight, height, bodyFat, measurements, notes, loggedAt, waist, hips, chest, arm, leg) {
        this.id = id;
        this.userId = userId;
        this.weight = weight;
        this.height = height;
        this.bodyFat = bodyFat;
        this.measurements = measurements;
        this.notes = notes;
        this.loggedAt = loggedAt;
        this.waist = waist;
        this.hips = hips;
        this.chest = chest;
        this.arm = arm;
        this.leg = leg;
    }
    static create(userId, weight, height, bodyFat, measurements, notes, waist, hips, chest, arm, leg) {
        return new BodyMetric(crypto.randomUUID(), userId, weight, height || null, bodyFat || null, measurements || null, notes || null, new Date(), waist || null, hips || null, chest || null, arm || null, leg || null);
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