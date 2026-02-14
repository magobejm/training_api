import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation, Priority } from '../domain/consultation.entity';

@Injectable()
export class CreateConsultationUseCase {
    constructor(
        @Inject(IConsultationRepository)
        private readonly repository: IConsultationRepository,
    ) { }

    async execute(command: {
        clientId: string;
        trainerId: string;
        subject: string;
        priority?: Priority;
    }): Promise<Consultation> {
        const consultation = Consultation.create(
            command.clientId,
            command.trainerId,
            command.subject,
            command.priority,
        );

        return this.repository.createConsultation(consultation);
    }
}
