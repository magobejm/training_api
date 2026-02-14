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
    SessionStatus,
} from '../domain/workout-session.entity';

@Injectable()
export class CompleteWorkoutSessionUseCase {
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

        // Ownership check
        if (session.userId !== command.userId) {
            throw new ForbiddenException(
                'You can only complete your own sessions',
            );
        }

        if (session.status === SessionStatus.COMPLETED) {
            // Already completed, return as-is
            return session;
        }

        const completedSession = session.complete();
        return this.sessionRepository.updateSession(completedSession);
    }
}
