import { Exercise } from '../../exercises/domain/exercise.entity';

export class DayExercise {
  constructor(
    public readonly id: string,
    public readonly dayId: string,
    public readonly exercise: Exercise,
    public readonly order: number,
    public readonly customDescription: string | null,
    public readonly customVideoUrl: string | null,
    public readonly customImageUrl: string | null,
    public readonly coachNotes: string | null,
    public readonly targetSets: number,
    public readonly targetReps: string,
    public readonly targetRir: number | null,
    public readonly restSeconds: number,
  ) { }

  get description(): string {
    return this.customDescription ?? this.exercise.description;
  }

  get videoUrl(): string | null {
    return this.customVideoUrl ?? this.exercise.defaultVideoUrl;
  }

  get imageUrl(): string | null {
    return this.customImageUrl ?? this.exercise.defaultImageUrl;
  }

  get thumbnailUrl(): string | null {
    // Use custom image as thumbnail if no dedicated thumbnail
    return this.customImageUrl ?? this.exercise.thumbnailUrl ?? this.exercise.defaultImageUrl;
  }
}
