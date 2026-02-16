import { Inject, Injectable } from '@nestjs/common';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class GetMuscleGroupsUseCase {
    constructor(
        @Inject(IExerciseRepository)
        private readonly exerciseRepository: IExerciseRepository,
    ) { }

    async execute() {
        return this.exerciseRepository.findAllMuscleGroups();
    }
}
