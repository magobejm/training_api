import { TrainingDay } from './training-day.entity';
export declare class TrainingPlan {
    readonly id: string;
    readonly name: string;
    readonly description: string | null;
    readonly authorId: string;
    readonly days: TrainingDay[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, description: string | null, authorId: string, days: TrainingDay[], createdAt: Date, updatedAt: Date);
    static create(name: string, description: string | null, authorId: string): TrainingPlan;
}
