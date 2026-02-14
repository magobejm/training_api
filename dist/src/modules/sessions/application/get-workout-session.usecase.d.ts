import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession } from '../domain/workout-session.entity';
export declare class GetWorkoutSessionUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: ISessionRepository);
    execute(command: {
        sessionId: string;
        userId: string;
    }): Promise<WorkoutSession>;
}
