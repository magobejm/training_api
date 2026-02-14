import {
    IsString,
    IsUUID,
    IsInt,
    IsNumber,
    Min,
    IsOptional,
    IsEnum,
    IsDateString,
} from 'class-validator';

export class StartSessionDto {
    @IsUUID()
    trainingDayId: string;
}

export class LogSetDto {
    @IsUUID()
    dayExerciseId: string;

    @IsInt()
    @Min(1)
    setIndex: number;

    @IsNumber()
    @Min(0)
    weightDone: number;

    @IsInt()
    @Min(1)
    repsDone: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    rpeDone?: number;
}

export class GetHistoryQueryDto {
    @IsOptional()
    @IsEnum(['IN_PROGRESS', 'COMPLETED', 'ABANDONED'])
    status?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
