export declare class LogMetricDto {
    weight: number;
    height?: number;
    bodyFat?: number;
    measurements?: Record<string, number>;
    notes?: string;
}
export declare class UploadPhotoDto {
    imageUrl: string;
    caption?: string;
}
export declare class GetMetricsQueryDto {
    startDate?: string;
    endDate?: string;
}
