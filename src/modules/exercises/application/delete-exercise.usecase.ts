import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { IExerciseRepository } from '../domain/exercise.repository';

interface DeleteExerciseInput {
    id: string;
    userId: string;
}

@Injectable()
export class DeleteExerciseUseCase {
    constructor(
        @Inject(IExerciseRepository)
        private readonly exerciseRepository: IExerciseRepository,
    ) { }

    async execute(input: DeleteExerciseInput): Promise<void> {
        const { id, userId } = input;

        // Check if exercise exists
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new NotFoundException(`Exercise with ID ${id} not found`);
        }

        // Check permissions: only creator can delete (unless admin - add role check later)
        if (exercise.createdBy !== userId) {
            throw new ForbiddenException(
                'You do not have permission to delete this exercise',
            );
        }

        // TODO: Check if exercise is used in any training plans
        // For now, we'll allow deletion - can add this validation later

        await this.exerciseRepository.delete(id);
    }
}
