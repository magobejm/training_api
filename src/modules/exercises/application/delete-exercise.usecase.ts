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
            throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
        }

        // Check permissions: only creator can delete (unless admin - add role check later)
        if (exercise.createdBy && exercise.createdBy !== userId) {
            // For now, if createdBy is null (system) or matches user.
            // If createdBy is set but different, block.
            throw new ForbiddenException(
                'No tienes permiso para eliminar este ejercicio',
            );
        }

        // Check if exercise is used in any training plans
        const isUsed = await this.exerciseRepository.hasDayExercises(id);
        if (isUsed) {
            throw new BadRequestException(
                'No se puede eliminar el ejercicio porque está siendo usado en uno o más planes de entrenamiento.',
            );
        }

        await this.exerciseRepository.delete(id);
    }
}
