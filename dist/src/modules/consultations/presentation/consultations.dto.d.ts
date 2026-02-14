import { Priority } from '../domain/consultation.entity';
export declare class CreateConsultationDto {
    trainerId: string;
    subject: string;
    priority?: Priority;
}
export declare class SendMessageDto {
    content: string;
}
export declare class GetConsultationsQueryDto {
    status?: string;
}
