import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSet } from '../domain/workout-session.entity';
export declare class LogWorkoutSetUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: ISessionRepository);
    execute(command: {
        sessionId: string;
        dayExerciseId: string;
        setIndex: number;
        weightDone: number;
        repsDone: number;
        rpeDone?: number;
        userId: string;
    }): Promise<WorkoutSet>;
}
