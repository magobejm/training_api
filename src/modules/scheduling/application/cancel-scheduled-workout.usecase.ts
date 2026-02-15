import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { ISchedulingRepository } from '../domain/scheduling.repository';

@Injectable()
export class CancelScheduledWorkoutUseCase {
    constructor(
        @Inject(ISchedulingRepository)
        private readonly repository: ISchedulingRepository,
    ) { }

    async execute(command: {
        scheduledWorkoutId: string;
        userId: string;
    }): Promise<void> {
        const workout = await this.repository.findById(
            command.scheduledWorkoutId,
        );

        if (!workout) {
            throw new NotFoundException('Scheduled workout not found');
        }

        // Ownership check
        if (workout.userId !== command.userId && workout.trainerId !== command.userId) {
            throw new ForbiddenException(
                'You can only cancel your own workouts or those you manage',
            );
        }

        await this.repository.deleteScheduledWorkout(command.scheduledWorkoutId);
    }
}
