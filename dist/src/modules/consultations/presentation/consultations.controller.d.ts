import { CreateConsultationUseCase } from '../application/create-consultation.usecase';
import { SendMessageUseCase } from '../application/send-message.usecase';
import { GetConsultationsUseCase } from '../application/get-consultations.usecase';
import { GetConsultationByIdUseCase } from '../application/get-consultation-by-id.usecase';
import { MarkConsultationAsResolvedUseCase } from '../application/mark-consultation-as-resolved.usecase';
import { CreateConsultationDto, SendMessageDto, GetConsultationsQueryDto } from './consultations.dto';
export declare class ConsultationsController {
    private readonly createConsultationUseCase;
    private readonly sendMessageUseCase;
    private readonly getConsultationsUseCase;
    private readonly getByIdUseCase;
    private readonly resolveUseCase;
    constructor(createConsultationUseCase: CreateConsultationUseCase, sendMessageUseCase: SendMessageUseCase, getConsultationsUseCase: GetConsultationsUseCase, getByIdUseCase: GetConsultationByIdUseCase, resolveUseCase: MarkConsultationAsResolvedUseCase);
    createConsultation(dto: CreateConsultationDto, clientId: string): Promise<{
        id: string;
        subject: string;
        status: import("../domain/consultation.entity").ConsultationStatus;
        priority: import("../domain/consultation.entity").Priority;
        createdAt: Date;
    }>;
    getConsultations(query: GetConsultationsQueryDto, userId: string): Promise<{
        consultations: {
            id: string;
            subject: string;
            status: import("../domain/consultation.entity").ConsultationStatus;
            priority: import("../domain/consultation.entity").Priority;
            createdAt: Date;
            updatedAt: Date;
            messageCount: number;
        }[];
        total: number;
    }>;
    getConsultation(consultationId: string, userId: string): Promise<{
        id: string;
        clientId: string;
        trainerId: string;
        subject: string;
        status: import("../domain/consultation.entity").ConsultationStatus;
        priority: import("../domain/consultation.entity").Priority;
        createdAt: Date;
        updatedAt: Date;
        resolvedAt: Date | null;
        messages: {
            id: string;
            senderId: string;
            content: string;
            createdAt: Date;
        }[];
    }>;
    sendMessage(consultationId: string, dto: SendMessageDto, userId: string): Promise<{
        id: string;
        senderId: string;
        content: string;
        createdAt: Date;
    }>;
    resolveConsultation(consultationId: string, userId: string): Promise<{
        id: string;
        status: import("../domain/consultation.entity").ConsultationStatus;
        resolvedAt: Date | null;
    }>;
}
