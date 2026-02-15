import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateScheduledWorkoutDto {
    @IsString()
    userId: string;

    @IsString()
    trainingDayId: string;

    @IsDateString()
    scheduledFor: string;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UpdateScheduledWorkoutDto {
    @IsOptional()
    @IsDateString()
    scheduledFor?: string; // For rescheduling

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    notes?: string;
}
