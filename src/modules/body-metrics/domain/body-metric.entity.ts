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
    ) { }

    static create(
        userId: string,
        weight: number,
        height?: number,
        bodyFat?: number,
        measurements?: Record<string, number>,
        notes?: string,
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
