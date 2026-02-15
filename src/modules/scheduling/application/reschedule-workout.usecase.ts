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

        // Ownership check: Allow if user is the owner OR the trainer assigned to the session
        // Note: Ideally we should check if the requester is the trainer of this session.
        // The current implementation assumes userId is the requester.
        // We check if requester is the client (workout.userId) or the trainer (workout.trainerId)
        if (workout.userId !== command.userId && workout.trainerId !== command.userId) {
            throw new ForbiddenException(
                'You can only reschedule your own workouts or those you manage',
            );
        }

        // Check for overlap
        const hasOverlap = await this.repository.hasOverlap(
            workout.userId,
            command.newDate,
            workout.id // Exclude current workout
        );

        if (hasOverlap) {
            throw new ForbiddenException('The client already has a session scheduled at this time');
        }

        const rescheduled = workout.reschedule(command.newDate);
        return this.repository.updateScheduledWorkout(rescheduled);
    }
}
