import { Module } from '@nestjs/common';
import { ConsultationsController } from './presentation/consultations.controller';
import { CreateConsultationUseCase } from './application/create-consultation.usecase';
import { SendMessageUseCase } from './application/send-message.usecase';
import { GetConsultationsUseCase } from './application/get-consultations.usecase';
import { GetConsultationByIdUseCase } from './application/get-consultation-by-id.usecase';
import { MarkConsultationAsResolvedUseCase } from './application/mark-consultation-as-resolved.usecase';
import { PrismaConsultationRepository } from './infra/prisma-consultation.repository';
import { IConsultationRepository } from './domain/consultation.repository';

@Module({
    controllers: [ConsultationsController],
    providers: [
        // Use cases
        CreateConsultationUseCase,
        SendMessageUseCase,
        GetConsultationsUseCase,
        GetConsultationByIdUseCase,
        MarkConsultationAsResolvedUseCase,
        // Repository
        {
            provide: IConsultationRepository,
            useClass: PrismaConsultationRepository,
        },
    ],
    exports: [IConsultationRepository],
})
export class ConsultationsModule { }
