import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IConsultationRepository } from '../domain/consultation.repository';
import {
    Consultation,
    Message,
    ConsultationStatus,
    Priority,
} from '../domain/consultation.entity';
import {
    Consultation as PrismaConsultation,
    Message as PrismaMessage,
    ConsultationStatus as PrismaConsultationStatus,
    Priority as PrismaPriority,
} from '@prisma/client';

type ConsultationWithMessages = PrismaConsultation & {
    messages: PrismaMessage[];
};

@Injectable()
export class PrismaConsultationRepository implements IConsultationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createConsultation(
        consultation: Consultation,
    ): Promise<Consultation> {
        const created = await this.prisma.consultation.create({
            data: {
                id: consultation.id,
                clientId: consultation.clientId,
                trainerId: consultation.trainerId,
                subject: consultation.subject,
                status: consultation.status as PrismaConsultationStatus,
                priority: consultation.priority as PrismaPriority,
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

    async findById(id: string): Promise<Consultation | null> {
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

    async findByUser(
        userId: string,
        filters?: {
            status?: string;
        },
    ): Promise<Consultation[]> {
        const consultations = await this.prisma.consultation.findMany({
            where: {
                OR: [{ clientId: userId }, { trainerId: userId }],
                ...(filters?.status && {
                    status: filters.status as PrismaConsultationStatus,
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

    async updateConsultation(
        consultation: Consultation,
    ): Promise<Consultation> {
        const updated = await this.prisma.consultation.update({
            where: { id: consultation.id },
            data: {
                status: consultation.status as PrismaConsultationStatus,
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

    async addMessage(message: Message): Promise<Message> {
        const created = await this.prisma.message.create({
            data: {
                id: message.id,
                consultationId: message.consultationId,
                senderId: message.senderId,
                content: message.content,
                createdAt: message.createdAt,
            },
        });

        // Update consultation updatedAt
        await this.prisma.consultation.update({
            where: { id: message.consultationId },
            data: { updatedAt: new Date() },
        });

        return this.mapMessageToDomain(created);
    }

    private mapToDomain(raw: ConsultationWithMessages): Consultation {
        return new Consultation(
            raw.id,
            raw.clientId,
            raw.trainerId,
            raw.subject,
            raw.status as ConsultationStatus,
            raw.priority as Priority,
            raw.createdAt,
            raw.updatedAt,
            raw.resolvedAt,
            raw.messages.map((m) => this.mapMessageToDomain(m)),
        );
    }

    private mapMessageToDomain(raw: PrismaMessage): Message {
        return new Message(
            raw.id,
            raw.consultationId,
            raw.senderId,
            raw.content,
            raw.readAt,
            raw.createdAt,
        );
    }
}
