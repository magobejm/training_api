import { PrismaService } from '../../../prisma/prisma.service';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation, Message } from '../domain/consultation.entity';
export declare class PrismaConsultationRepository implements IConsultationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createConsultation(consultation: Consultation): Promise<Consultation>;
    findById(id: string): Promise<Consultation | null>;
    findByUser(userId: string, filters?: {
        status?: string;
    }): Promise<Consultation[]>;
    updateConsultation(consultation: Consultation): Promise<Consultation>;
    addMessage(message: Message): Promise<Message>;
    private mapToDomain;
    private mapMessageToDomain;
}
