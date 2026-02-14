import {
    Inject,
    Injectable,
} from '@nestjs/common';
import {
    ISessionRepository,
} from '../domain/session.repository';
import {
    WorkoutSession,
} from '../domain/workout-session.entity';

@Injectable()
export class GetWorkoutHistoryUseCase {
    constructor(
        @Inject(ISessionRepository)
        private readonly sessionRepository: ISessionRepository,
    ) { }

    async execute(command: {
        userId: string;
        status?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<WorkoutSession[]> {
        return this.sessionRepository.findUserSessions(command.userId, {
            status: command.status,
            startDate: command.startDate,
            endDate: command.endDate,
        });
    }
}
