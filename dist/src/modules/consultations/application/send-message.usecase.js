"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageUseCase = void 0;
const common_1 = require("@nestjs/common");
const consultation_repository_1 = require("../domain/consultation.repository");
const consultation_entity_1 = require("../domain/consultation.entity");
let SendMessageUseCase = class SendMessageUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(command) {
        const consultation = await this.repository.findById(command.consultationId);
        if (!consultation) {
            throw new common_1.NotFoundException('Consultation not found');
        }
        if (consultation.clientId !== command.senderId &&
            consultation.trainerId !== command.senderId) {
            throw new common_1.ForbiddenException('You can only send messages to your own consultations');
        }
        const message = consultation_entity_1.Message.create(command.consultationId, command.senderId, command.content);
        return this.repository.addMessage(message);
    }
};
exports.SendMessageUseCase = SendMessageUseCase;
exports.SendMessageUseCase = SendMessageUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(consultation_repository_1.IConsultationRepository)),
    __metadata("design:paramtypes", [Object])
], SendMessageUseCase);
//# sourceMappingURL=send-message.usecase.js.map