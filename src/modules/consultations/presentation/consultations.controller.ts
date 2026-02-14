import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CreateConsultationUseCase } from '../application/create-consultation.usecase';
import { SendMessageUseCase } from '../application/send-message.usecase';
import { GetConsultationsUseCase } from '../application/get-consultations.usecase';
import { GetConsultationByIdUseCase } from '../application/get-consultation-by-id.usecase';
import { MarkConsultationAsResolvedUseCase } from '../application/mark-consultation-as-resolved.usecase';
import {
    CreateConsultationDto,
    SendMessageDto,
    GetConsultationsQueryDto,
} from './consultations.dto';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class ConsultationsController {
    constructor(
        private readonly createConsultationUseCase: CreateConsultationUseCase,
        private readonly sendMessageUseCase: SendMessageUseCase,
        private readonly getConsultationsUseCase: GetConsultationsUseCase,
        private readonly getByIdUseCase: GetConsultationByIdUseCase,
        private readonly resolveUseCase: MarkConsultationAsResolvedUseCase,
    ) { }

    @Post()
    async createConsultation(
        @Body() dto: CreateConsultationDto,
        @CurrentUser('sub') clientId: string,
    ) {
        const consultation = await this.createConsultationUseCase.execute({
            clientId,
            trainerId: dto.trainerId,
            subject: dto.subject,
            priority: dto.priority,
        });

        return {
            id: consultation.id,
            subject: consultation.subject,
            status: consultation.status,
            priority: consultation.priority,
            createdAt: consultation.createdAt,
        };
    }

    @Get()
    async getConsultations(
        @Query() query: GetConsultationsQueryDto,
        @CurrentUser('sub') userId: string,
    ) {
        const consultations = await this.getConsultationsUseCase.execute({
            userId,
            status: query.status,
        });

        return {
            consultations: consultations.map((c) => ({
                id: c.id,
                subject: c.subject,
                status: c.status,
                priority: c.priority,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                messageCount: c.messages.length,
            })),
            total: consultations.length,
        };
    }

    @Get(':consultationId')
    async getConsultation(
        @Param('consultationId') consultationId: string,
        @CurrentUser('sub') userId: string,
    ) {
        const consultation = await this.getByIdUseCase.execute({
            consultationId,
            userId,
        });

        return {
            id: consultation.id,
            clientId: consultation.clientId,
            trainerId: consultation.trainerId,
            subject: consultation.subject,
            status: consultation.status,
            priority: consultation.priority,
            createdAt: consultation.createdAt,
            updatedAt: consultation.updatedAt,
            resolvedAt: consultation.resolvedAt,
            messages: consultation.messages.map((m) => ({
                id: m.id,
                senderId: m.senderId,
                content: m.content,
                createdAt: m.createdAt,
            })),
        };
    }

    @Post(':consultationId/messages')
    async sendMessage(
        @Param('consultationId') consultationId: string,
        @Body() dto: SendMessageDto,
        @CurrentUser('sub') userId: string,
    ) {
        const message = await this.sendMessageUseCase.execute({
            consultationId,
            senderId: userId,
            content: dto.content,
        });

        return {
            id: message.id,
            senderId: message.senderId,
            content: message.content,
            createdAt: message.createdAt,
        };
    }

    @Patch(':consultationId/resolve')
    async resolveConsultation(
        @Param('consultationId') consultationId: string,
        @CurrentUser('sub') userId: string,
    ) {
        const consultation = await this.resolveUseCase.execute({
            consultationId,
            userId,
        });

        return {
            id: consultation.id,
            status: consultation.status,
            resolvedAt: consultation.resolvedAt,
        };
    }
}
