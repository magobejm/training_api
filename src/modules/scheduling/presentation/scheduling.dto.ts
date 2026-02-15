import {
    IsUUID,
    IsDateString,
    IsOptional,
    IsString,
} from 'class-validator';

export class ScheduleWorkoutDto {
    @IsOptional()
    @IsUUID()
    trainerId?: string;

    @IsOptional()
    @IsUUID()
    clientId?: string;

    @IsUUID()
    trainingDayId: string;

    @IsDateString()
    scheduledFor: string;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class RescheduleWorkoutDto {
    @IsDateString()
    newDate: string;
}

export class GetScheduleQueryDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
