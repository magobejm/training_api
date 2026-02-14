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
    WorkoutSet,
    SessionStatus,
} from '../domain/workout-session.entity';

@Injectable()
export class LogWorkoutSetUseCase {
    constructor(
        @Inject(ISessionRepository)
        private readonly sessionRepository: ISessionRepository,
    ) { }

    async execute(command: {
        sessionId: string;
        dayExerciseId: string;
        setIndex: number;
        weightDone: number;
        repsDone: number;
        rpeDone?: number;
        userId: string; // For ownership check
    }): Promise<WorkoutSet> {
        const session = await this.sessionRepository.findSessionById(
            command.sessionId,
        );

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        // Ownership check
        if (session.userId !== command.userId) {
            throw new ForbiddenException(
                'You can only log sets for your own sessions',
            );
        }

        // Cannot log sets to completed session
        if (session.status !== SessionStatus.IN_PROGRESS) {
            throw new ForbiddenException('Cannot log sets to a completed session');
        }

        const workoutSet = WorkoutSet.create(
            command.sessionId,
            command.dayExerciseId,
            command.setIndex,
            command.weightDone,
            command.repsDone,
            command.rpeDone,
        );

        return this.sessionRepository.addSetToSession(workoutSet);
    }
}
