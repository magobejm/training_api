import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    ISessionRepository,
} from '../domain/session.repository';
import {
    WorkoutSession,
} from '../domain/workout-session.entity';

@Injectable()
export class StartWorkoutSessionUseCase {
    constructor(
        @Inject(ISessionRepository)
        private readonly sessionRepository: ISessionRepository,
    ) { }

    async execute(command: {
        userId: string;
        trainingDayId: string;
    }): Promise<WorkoutSession> {
        // Check if user already has an active session
        const activeSession = await this.sessionRepository.findActiveSessionByUser(
            command.userId,
        );

        if (activeSession) {
            // Return existing active session instead of creating duplicate
            return activeSession;
        }

        const session = WorkoutSession.start(
            command.userId,
            command.trainingDayId,
        );

        return this.sessionRepository.createSession(session);
    }
}
