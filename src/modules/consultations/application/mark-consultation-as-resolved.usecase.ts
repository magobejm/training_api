import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation } from '../domain/consultation.entity';

@Injectable()
export class MarkConsultationAsResolvedUseCase {
    constructor(
        @Inject(IConsultationRepository)
        private readonly repository: IConsultationRepository,
    ) { }

    async execute(command: {
        consultationId: string;
        userId: string;
    }): Promise<Consultation> {
        const consultation = await this.repository.findById(
            command.consultationId,
        );

        if (!consultation) {
            throw new NotFoundException('Consultation not found');
        }

        // Only trainer can resolve consultations
        if (consultation.trainerId !== command.userId) {
            throw new ForbiddenException(
                'Only the trainer can resolve consultations',
            );
        }

        const resolved = consultation.resolve();
        return this.repository.updateConsultation(resolved);
    }
}
