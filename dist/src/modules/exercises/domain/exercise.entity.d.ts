export declare class Exercise {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly muscleGroup: string;
    readonly defaultVideoUrl: string | null;
    readonly defaultImageUrl: string | null;
    readonly thumbnailUrl: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly createdBy: string | null;
    readonly updatedBy: string | null;
    readonly deletedAt: Date | null;
    readonly deletedBy: string | null;
    constructor(id: string, name: string, description: string, muscleGroup: string, defaultVideoUrl: string | null, defaultImageUrl: string | null, thumbnailUrl: string | null, createdAt: Date, updatedAt: Date, createdBy: string | null, updatedBy: string | null, deletedAt: Date | null, deletedBy: string | null);
    static create(name: string, description: string, muscleGroup: string, defaultVideoUrl: string | null, defaultImageUrl: string | null, thumbnailUrl: string | null, userId: string): Exercise;
}
