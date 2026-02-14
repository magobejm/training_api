import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation, Priority } from '../domain/consultation.entity';
export declare class CreateConsultationUseCase {
    private readonly repository;
    constructor(repository: IConsultationRepository);
    execute(command: {
        clientId: string;
        trainerId: string;
        subject: string;
        priority?: Priority;
    }): Promise<Consultation>;
}
