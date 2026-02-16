import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class GetExercisesUseCase {
  constructor(
    @Inject(IExerciseRepository)
    private readonly exerciseRepository: IExerciseRepository,
  ) { }

  async execute(userId: string): Promise<Exercise[]> {
    return this.exerciseRepository.findAll(userId);
  }
}
