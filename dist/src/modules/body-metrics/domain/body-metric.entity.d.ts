export declare class BodyMetric {
    readonly id: string;
    readonly userId: string;
    readonly weight: number;
    readonly height: number | null;
    readonly bodyFat: number | null;
    readonly measurements: Record<string, number> | null;
    readonly notes: string | null;
    readonly loggedAt: Date;
    readonly waist: number | null;
    readonly hips: number | null;
    readonly chest: number | null;
    readonly arm: number | null;
    readonly leg: number | null;
    constructor(id: string, userId: string, weight: number, height: number | null, bodyFat: number | null, measurements: Record<string, number> | null, notes: string | null, loggedAt: Date, waist: number | null, hips: number | null, chest: number | null, arm: number | null, leg: number | null);
    static create(userId: string, weight: number, height?: number, bodyFat?: number, measurements?: Record<string, number>, notes?: string, waist?: number, hips?: number, chest?: number, arm?: number, leg?: number): BodyMetric;
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
