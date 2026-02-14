import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

interface UpdateExerciseInput {
    id: string;
    data: Partial<Exercise>;
    userId: string;
}

@Injectable()
export class UpdateExerciseUseCase {
    constructor(
        @Inject(IExerciseRepository)
        private readonly exerciseRepository: IExerciseRepository,
    ) { }

    async execute(input: UpdateExerciseInput): Promise<Exercise> {
        const { id, data, userId } = input;

        // Check if exercise exists
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }

        // Check permissions: only creator can update (unless admin - add role check later)
        if (exercise.createdBy !== userId) {
            throw new ForbiddenException(
                'You do not have permission to update this exercise',
            );
        }

        // Update exercise
        const updatedExercise = await this.exerciseRepository.update(id, {
            ...data,
            updatedBy: userId,
        });

        return updatedExercise;
    }
}
