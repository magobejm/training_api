import { DayExercise } from './day-exercise.entity';
export declare class TrainingDay {
    readonly id: string;
    readonly name: string;
    readonly order: number;
    readonly planId: string;
    readonly exercises: DayExercise[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, order: number, planId: string, exercises: DayExercise[], createdAt: Date, updatedAt: Date);
}
