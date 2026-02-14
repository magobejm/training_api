"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consultation = exports.Message = exports.Priority = exports.ConsultationStatus = void 0;
var ConsultationStatus;
(function (ConsultationStatus) {
    ConsultationStatus["OPEN"] = "OPEN";
    ConsultationStatus["RESOLVED"] = "RESOLVED";
})(ConsultationStatus || (exports.ConsultationStatus = ConsultationStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "LOW";
    Priority["MEDIUM"] = "MEDIUM";
    Priority["HIGH"] = "HIGH";
})(Priority || (exports.Priority = Priority = {}));
class Message {
    id;
    consultationId;
    senderId;
    content;
    readAt;
    createdAt;
    constructor(id, consultationId, senderId, content, readAt, createdAt) {
        this.id = id;
        this.consultationId = consultationId;
        this.senderId = senderId;
        this.content = content;
        this.readAt = readAt;
        this.createdAt = createdAt;
    }
    static create(consultationId, senderId, content) {
        return new Message(crypto.randomUUID(), consultationId, senderId, content, null, new Date());
    }
}
exports.Message = Message;
class Consultation {
    id;
    clientId;
    trainerId;
    subject;
    status;
    priority;
    createdAt;
    updatedAt;
    resolvedAt;
    messages;
    constructor(id, clientId, trainerId, subject, status, priority, createdAt, updatedAt, resolvedAt, messages) {
        this.id = id;
        this.clientId = clientId;
        this.trainerId = trainerId;
        this.subject = subject;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.resolvedAt = resolvedAt;
        this.messages = messages;
    }
    static create(clientId, trainerId, subject, priority = Priority.MEDIUM) {
        return new Consultation(crypto.randomUUID(), clientId, trainerId, subject, ConsultationStatus.OPEN, priority, new Date(), new Date(), null, []);
    }
    resolve() {
        return new Consultation(this.id, this.clientId, this.trainerId, this.subject, ConsultationStatus.RESOLVED, this.priority, this.createdAt, new Date(), new Date(), this.messages);
    }
}
exports.Consultation = Consultation;
//# sourceMappingURL=consultation.entity.js.map