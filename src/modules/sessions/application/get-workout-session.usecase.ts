import {
    Inject,
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import {
    ISessionRepository,
} from '../domain/session.repository';
import {
    WorkoutSession,
} from '../domain/workout-session.entity';

@Injectable()
export class GetWorkoutSessionUseCase {
    constructor(
        @Inject(ISessionRepository)
        private readonly sessionRepository: ISessionRepository,
    ) { }

    async execute(command: {
        sessionId: string;
        userId: string; // For ownership check
    }): Promise<WorkoutSession> {
        const session = await this.sessionRepository.findSessionById(
            command.sessionId,
        );

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // Ownership check: user can view their own sessions
        if (session.userId !== command.userId) {
            throw new ForbiddenException(
                'You can only view your own sessions',
            );
        }

        return session;
    }
}
