import { IConsultationRepository } from '../domain/consultation.repository';
import { Message } from '../domain/consultation.entity';
export declare class SendMessageUseCase {
    private readonly repository;
    constructor(repository: IConsultationRepository);
    execute(command: {
        consultationId: string;
        senderId: string;
        content: string;
    }): Promise<Message>;
}
