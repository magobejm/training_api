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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const create_consultation_usecase_1 = require("../application/create-consultation.usecase");
const send_message_usecase_1 = require("../application/send-message.usecase");
const get_consultations_usecase_1 = require("../application/get-consultations.usecase");
const get_consultation_by_id_usecase_1 = require("../application/get-consultation-by-id.usecase");
const mark_consultation_as_resolved_usecase_1 = require("../application/mark-consultation-as-resolved.usecase");
const consultations_dto_1 = require("./consultations.dto");
let ConsultationsController = class ConsultationsController {
    createConsultationUseCase;
    sendMessageUseCase;
    getConsultationsUseCase;
    getByIdUseCase;
    resolveUseCase;
    constructor(createConsultationUseCase, sendMessageUseCase, getConsultationsUseCase, getByIdUseCase, resolveUseCase) {
        this.createConsultationUseCase = createConsultationUseCase;
        this.sendMessageUseCase = sendMessageUseCase;
        this.getConsultationsUseCase = getConsultationsUseCase;
        this.getByIdUseCase = getByIdUseCase;
        this.resolveUseCase = resolveUseCase;
    }
    async createConsultation(dto, clientId) {
        const consultation = await this.createConsultationUseCase.execute({
            clientId,
            trainerId: dto.trainerId,
            subject: dto.subject,
            priority: dto.priority,
        });
        return {
            id: consultation.id,
            subject: consultation.subject,
            status: consultation.status,
            priority: consultation.priority,
            createdAt: consultation.createdAt,
        };
    }
    async getConsultations(query, userId) {
        const consultations = await this.getConsultationsUseCase.execute({
            userId,
            status: query.status,
        });
        return {
            consultations: consultations.map((c) => ({
                id: c.id,
                subject: c.subject,
                status: c.status,
                priority: c.priority,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                messageCount: c.messages.length,
            })),
            total: consultations.length,
        };
    }
    async getConsultation(consultationId, userId) {
        const consultation = await this.getByIdUseCase.execute({
            consultationId,
            userId,
        });
        return {
            id: consultation.id,
            clientId: consultation.clientId,
            trainerId: consultation.trainerId,
            subject: consultation.subject,
            status: consultation.status,
            priority: consultation.priority,
            createdAt: consultation.createdAt,
            updatedAt: consultation.updatedAt,
            resolvedAt: consultation.resolvedAt,
            messages: consultation.messages.map((m) => ({
                id: m.id,
                senderId: m.senderId,
                content: m.content,
                createdAt: m.createdAt,
            })),
        };
    }
    async sendMessage(consultationId, dto, userId) {
        const message = await this.sendMessageUseCase.execute({
            consultationId,
            senderId: userId,
            content: dto.content,
        });
        return {
            id: message.id,
            senderId: message.senderId,
            content: message.content,
            createdAt: message.createdAt,
        };
    }
    async resolveConsultation(consultationId, userId) {
        const consultation = await this.resolveUseCase.execute({
            consultationId,
            userId,
        });
        return {
            id: consultation.id,
            status: consultation.status,
            resolvedAt: consultation.resolvedAt,
        };
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultations_dto_1.CreateConsultationDto, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "createConsultation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultations_dto_1.GetConsultationsQueryDto, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "getConsultations", null);
__decorate([
    (0, common_1.Get)(':consultationId'),
    __param(0, (0, common_1.Param)('consultationId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "getConsultation", null);
__decorate([
    (0, common_1.Post)(':consultationId/messages'),
    __param(0, (0, common_1.Param)('consultationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, consultations_dto_1.SendMessageDto, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)(':consultationId/resolve'),
    __param(0, (0, common_1.Param)('consultationId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConsultationsController.prototype, "resolveConsultation", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, common_1.Controller)('consultations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_consultation_usecase_1.CreateConsultationUseCase,
        send_message_usecase_1.SendMessageUseCase,
        get_consultations_usecase_1.GetConsultationsUseCase,
        get_consultation_by_id_usecase_1.GetConsultationByIdUseCase,
        mark_consultation_as_resolved_usecase_1.MarkConsultationAsResolvedUseCase])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map