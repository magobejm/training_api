import { TrainingDay } from './training-day.entity';

export class TrainingPlan {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly authorId: string,
    public readonly days: TrainingDay[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    name: string,
    description: string | null,
    authorId: string,
  ): TrainingPlan {
    return new TrainingPlan(
      crypto.randomUUID(), // Mock ID generation
      name,
      description,
      authorId,
      [],
      new Date(),
      new Date(),
    );
  }
}
