import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';

@Injectable()
export class RescheduleWorkoutUseCase {
    constructor(
        @Inject(ISchedulingRepository)
        private readonly repository: ISchedulingRepository,
    ) { }

    async execute(command: {
        scheduledWorkoutId: string;
        newDate: Date;
        userId: string;
    }): Promise<ScheduledWorkout> {
        const workout = await this.repository.findById(
            command.scheduledWorkoutId,
        );

        if (!workout) {
            throw new NotFoundException('Scheduled workout not found');
        }

        // Ownership check
        if (workout.userId !== command.userId) {
            throw new ForbiddenException(
                'You can only reschedule your own workouts',
            );
        }

        const rescheduled = workout.reschedule(command.newDate);
        return this.repository.updateScheduledWorkout(rescheduled);
    }
}
