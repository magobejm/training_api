import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession } from '../domain/workout-session.entity';
export declare class GetWorkoutHistoryUseCase {
    private readonly sessionRepository;
    constructor(sessionRepository: ISessionRepository);
    execute(command: {
        userId: string;
        status?: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<WorkoutSession[]>;
}
