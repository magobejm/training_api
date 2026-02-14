import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession } from '../domain/workout-session.entity';
export declare class StartWorkoutSessionUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: ISessionRepository);
    execute(command: {
        userId: string;
        trainingDayId: string;
    }): Promise<WorkoutSession>;
}
