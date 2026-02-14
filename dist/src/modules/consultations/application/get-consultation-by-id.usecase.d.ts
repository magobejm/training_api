import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation } from '../domain/consultation.entity';
export declare class GetConsultationByIdUseCase {
    private readonly repository;
    constructor(repository: IConsultationRepository);
    execute(command: {
        consultationId: string;
        userId: string;
    }): Promise<Consultation>;
}
