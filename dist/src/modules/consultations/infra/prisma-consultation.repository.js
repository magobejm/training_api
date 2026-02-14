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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConsultationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const consultation_entity_1 = require("../domain/consultation.entity");
let PrismaConsultationRepository = class PrismaConsultationRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConsultation(consultation) {
        const created = await this.prisma.consultation.create({
            data: {
                id: consultation.id,
                clientId: consultation.clientId,
                trainerId: consultation.trainerId,
                subject: consultation.subject,
                status: consultation.status,
                priority: consultation.priority,
                createdAt: consultation.createdAt,
                updatedAt: consultation.updatedAt,
                resolvedAt: consultation.resolvedAt,
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        return this.mapToDomain(created);
    }
    async findById(id) {
        const consultation = await this.prisma.consultation.findUnique({
            where: { id },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        return consultation ? this.mapToDomain(consultation) : null;
    }
    async findByUser(userId, filters) {
        const consultations = await this.prisma.consultation.findMany({
            where: {
                OR: [{ clientId: userId }, { trainerId: userId }],
                ...(filters?.status && {
                    status: filters.status,
                }),
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
        return consultations.map((c) => this.mapToDomain(c));
    }
    async updateConsultation(consultation) {
        const updated = await this.prisma.consultation.update({
            where: { id: consultation.id },
            data: {
                status: consultation.status,
                resolvedAt: consultation.resolvedAt,
                updatedAt: consultation.updatedAt,
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        return this.mapToDomain(updated);
    }
    async addMessage(message) {
        const created = await this.prisma.message.create({
            data: {
                id: message.id,
                consultationId: message.consultationId,
                senderId: message.senderId,
                content: message.content,
                createdAt: message.createdAt,
            },
        });
        await this.prisma.consultation.update({
            where: { id: message.consultationId },
            data: { updatedAt: new Date() },
        });
        return this.mapMessageToDomain(created);
    }
    mapToDomain(raw) {
        return new consultation_entity_1.Consultation(raw.id, raw.clientId, raw.trainerId, raw.subject, raw.status, raw.priority, raw.createdAt, raw.updatedAt, raw.resolvedAt, raw.messages.map((m) => this.mapMessageToDomain(m)));
    }
    mapMessageToDomain(raw) {
        return new consultation_entity_1.Message(raw.id, raw.consultationId, raw.senderId, raw.content, raw.readAt, raw.createdAt);
    }
};
exports.PrismaConsultationRepository = PrismaConsultationRepository;
exports.PrismaConsultationRepository = PrismaConsultationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaConsultationRepository);
//# sourceMappingURL=prisma-consultation.repository.js.map