import { Exercise } from '../../exercises/domain/exercise.entity';
export declare class DayExercise {
    readonly id: string;
    readonly dayId: string;
    readonly exercise: Exercise;
    readonly order: number;
    readonly customDescription: string | null;
    readonly customVideoUrl: string | null;
    readonly customImageUrl: string | null;
    readonly coachNotes: string | null;
    readonly targetSets: number;
    readonly targetReps: string;
    readonly targetRir: number | null;
    readonly restSeconds: number;
    constructor(id: string, dayId: string, exercise: Exercise, order: number, customDescription: string | null, customVideoUrl: string | null, customImageUrl: string | null, coachNotes: string | null, targetSets: number, targetReps: string, targetRir: number | null, restSeconds: number);
    get description(): string;
    get videoUrl(): string | null;
    get imageUrl(): string | null;
    get thumbnailUrl(): string | null;
}
