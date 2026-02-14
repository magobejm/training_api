export declare class BodyMetric {
    readonly id: string;
    readonly userId: string;
    readonly weight: number;
    readonly height: number | null;
    readonly bodyFat: number | null;
    readonly measurements: Record<string, number> | null;
    readonly notes: string | null;
    readonly loggedAt: Date;
    constructor(id: string, userId: string, weight: number, height: number | null, bodyFat: number | null, measurements: Record<string, number> | null, notes: string | null, loggedAt: Date);
    static create(userId: string, weight: number, height?: number, bodyFat?: number, measurements?: Record<string, number>, notes?: string): BodyMetric;
}
export declare class ProgressPhoto {
    readonly id: string;
    readonly userId: string;
    readonly imageUrl: string;
    readonly caption: string | null;
    readonly loggedAt: Date;
    constructor(id: string, userId: string, imageUrl: string, caption: string | null, loggedAt: Date);
    static create(userId: string, imageUrl: string, caption?: string): ProgressPhoto;
}
