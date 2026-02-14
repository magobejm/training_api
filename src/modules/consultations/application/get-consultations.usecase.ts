import { Inject, Injectable } from '@nestjs/common';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation } from '../domain/consultation.entity';

@Injectable()
export class GetConsultationsUseCase {
    constructor(
        @Inject(IConsultationRepository)
        private readonly repository: IConsultationRepository,
    ) { }

    async execute(command: {
        userId: string;
        status?: string;
    }): Promise<Consultation[]> {
        return this.repository.findByUser(command.userId, {
            status: command.status,
        });
    }
}
