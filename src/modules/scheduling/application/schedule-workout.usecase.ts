import { Inject, Injectable } from '@nestjs/common';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';

@Injectable()
export class ScheduleWorkoutUseCase {
    constructor(
        @Inject(ISchedulingRepository)
        private readonly repository: ISchedulingRepository,
    ) { }

    async execute(command: {
        userId: string;
        trainerId: string;
        trainingDayId: string;
        scheduledFor: Date;
        notes?: string;
    }): Promise<ScheduledWorkout> {
        const workout = ScheduledWorkout.create(
            command.userId,
            command.trainerId,
            command.trainingDayId,
            command.scheduledFor,
            command.notes,
        );

        return this.repository.scheduleWorkout(workout);
    }
}
