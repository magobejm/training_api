import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class CreateExerciseUseCase {
  constructor(
    @Inject(IExerciseRepository)
    private readonly exerciseRepository: IExerciseRepository,
  ) { }

  async execute(command: {
    name: string;
    description: string;
    muscleGroup: string;
    videoUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    userId: string;
  }): Promise<Exercise> {
    const exercise = Exercise.create(
      command.name,
      command.description,
      command.muscleGroup,
      command.videoUrl || null,
      command.imageUrl || null,
      command.thumbnailUrl || null,
      command.userId,
    );
    return this.exerciseRepository.create(exercise);
  }
}
