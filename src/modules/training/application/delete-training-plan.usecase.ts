import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';

interface DeleteTrainingPlanInput {
    id: string;
    userId: string;
}

@Injectable()
export class DeleteTrainingPlanUseCase {
    constructor(
        @Inject(ITrainingRepository)
        private readonly trainingRepository: ITrainingRepository,
    ) { }

    async execute(input: DeleteTrainingPlanInput): Promise<void> {
        const { id, userId } = input;

        const plan = await this.trainingRepository.getPlanById(id);
        if (!plan) {
            throw new NotFoundException(`Plan de entrenamiento con ID ${id} no encontrado`);
        }

        if (plan.authorId !== userId) {
            throw new ForbiddenException('No tienes permiso para eliminar este plan');
        }

        // Check for dependencies (ScheduledWorkouts)
        const hasDependencies = await this.trainingRepository.hasScheduledWorkouts(id);
        if (hasDependencies) {
            throw new BadRequestException('No se puede eliminar el plan porque tiene sesiones programadas para clientes.');
        }

        // Check for active users
        const hasActiveUsers = await this.trainingRepository.hasActiveUsers(id);
        if (hasActiveUsers) {
            throw new BadRequestException('No se puede eliminar el plan porque está asignado actualmente a clientes activos.');
        }

        await this.trainingRepository.deletePlan(id);
    }
}
