import {
    IsString,
    IsUUID,
    IsEnum,
    IsOptional,
    MinLength,
} from 'class-validator';
import { Priority } from '../domain/consultation.entity';

export class CreateConsultationDto {
    @IsUUID()
    trainerId: string;

    @IsString()
    @MinLength(3)
    subject: string;

    @IsOptional()
    @IsEnum(Priority)
    priority?: Priority;
}

export class SendMessageDto {
    @IsString()
    @MinLength(1)
    content: string;
}

export class GetConsultationsQueryDto {
    @IsOptional()
    @IsEnum(['OPEN', 'RESOLVED'])
    status?: string;
}
