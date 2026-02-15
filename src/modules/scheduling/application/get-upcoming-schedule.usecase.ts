import { Inject, Injectable } from '@nestjs/common';
import { ISchedulingRepository } from '../domain/scheduling.repository';
import { ScheduledWorkout } from '../domain/scheduled-workout.entity';

@Injectable()
export class GetUpcomingScheduleUseCase {
    constructor(
        @Inject(ISchedulingRepository)
        private readonly repository: ISchedulingRepository,
    ) { }

    async execute(command: {
        userId: string;
        startDate?: Date;
        endDate?: Date;
        trainerId?: string;
    }): Promise<ScheduledWorkout[]> {
        return this.repository.findUpcoming(command.userId, {
            startDate: command.startDate,
            endDate: command.endDate,
            trainerId: command.trainerId,
        });
    }
}
