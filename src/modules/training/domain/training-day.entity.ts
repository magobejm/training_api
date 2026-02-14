import { DayExercise } from './day-exercise.entity';

export class TrainingDay {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly order: number,
    public readonly planId: string,
    public readonly exercises: DayExercise[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
