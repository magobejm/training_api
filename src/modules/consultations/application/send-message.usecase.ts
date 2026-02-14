import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Message } from '../domain/consultation.entity';

@Injectable()
export class SendMessageUseCase {
    constructor(
        @Inject(IConsultationRepository)
        private readonly repository: IConsultationRepository,
    ) { }

    async execute(command: {
        consultationId: string;
        senderId: string;
        content: string;
    }): Promise<Message> {
        const consultation = await this.repository.findById(
            command.consultationId,
        );

        if (!consultation) {
            throw new NotFoundException('Consultation not found');
        }

        // Ownership check: only participants can send messages
        if (
            consultation.clientId !== command.senderId &&
            consultation.trainerId !== command.senderId
        ) {
            throw new ForbiddenException(
                'You can only send messages to your own consultations',
            );
        }

        const message = Message.create(
            command.consultationId,
            command.senderId,
            command.content,
        );

        return this.repository.addMessage(message);
    }
}
