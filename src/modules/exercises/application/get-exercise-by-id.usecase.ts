import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class GetExerciseByIdUseCase {
    constructor(
        @Inject(IExerciseRepository)
        private readonly exerciseRepository: IExerciseRepository,
    ) { }

    async execute(id: string): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findById(id);

        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }

        return exercise;
    }
}
