import { Consultation, Message } from './consultation.entity';

export interface IConsultationRepository {
    createConsultation(consultation: Consultation): Promise<Consultation>;
    findById(id: string): Promise<Consultation | null>;
    findByUser(
        userId: string,
        filters?: {
            status?: string;
        },
    ): Promise<Consultation[]>;
    updateConsultation(consultation: Consultation): Promise<Consultation>;
    addMessage(message: Message): Promise<Message>;
}

export const IConsultationRepository = Symbol('IConsultationRepository');
