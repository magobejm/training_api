import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation } from '../domain/consultation.entity';
export declare class GetConsultationsUseCase {
    private readonly repository;
    constructor(repository: IConsultationRepository);
    execute(command: {
        userId: string;
        status?: string;
    }): Promise<Consultation[]>;
}
