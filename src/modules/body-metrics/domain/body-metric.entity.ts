export class BodyMetric {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly weight: number,
        public readonly height: number | null,
        public readonly bodyFat: number | null,
        public readonly measurements: Record<string, number> | null,
        public readonly notes: string | null,
        public readonly loggedAt: Date,
        public readonly waist: number | null,
        public readonly hips: number | null,
        public readonly chest: number | null,
        public readonly arm: number | null,
        public readonly leg: number | null,
    ) { }

    static create(
        userId: string,
        weight: number,
        height?: number,
        bodyFat?: number,
        measurements?: Record<string, number>,
        notes?: string,
        waist?: number,
        hips?: number,
        chest?: number,
        arm?: number,
        leg?: number,
    ): BodyMetric {
        return new BodyMetric(
            crypto.randomUUID(),
            userId,
            weight,
            height || null,
            bodyFat || null,
            measurements || null,
            notes || null,
            new Date(),
            waist || null,
            hips || null,
            chest || null,
            arm || null,
            leg || null,
        );
    }
}

export class ProgressPhoto {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly imageUrl: string,
        public readonly caption: string | null,
        public readonly loggedAt: Date,
    ) { }

    static create(
        userId: string,
        imageUrl: string,
        caption?: string,
    ): ProgressPhoto {
        return new ProgressPhoto(
            crypto.randomUUID(),
            userId,
            imageUrl,
            caption || null,
            new Date(),
        );
    }
}
