import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation } from '../domain/consultation.entity';

@Injectable()
export class GetConsultationByIdUseCase {
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

        // Ownership check: only participants can view
        if (
            consultation.clientId !== command.userId &&
            consultation.trainerId !== command.userId
        ) {
            throw new ForbiddenException(
                'You can only view your own consultations',
            );
        }

        return consultation;
    }
}
