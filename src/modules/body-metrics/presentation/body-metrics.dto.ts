import {
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Min,
    Max,
    IsObject,
    IsDateString,
} from 'class-validator';

export class LogMetricDto {
    @IsNumber()
    @Min(0)
    weight: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    height?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    bodyFat?: number;

    @IsOptional()
    @IsObject()
    measurements?: Record<string, number>;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UploadPhotoDto {
    @IsUrl()
    imageUrl: string;

    @IsOptional()
    @IsString()
    caption?: string;
}

export class GetMetricsQueryDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
