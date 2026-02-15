import { Test, TestingModule } from '@nestjs/testing';
import { StartWorkoutSessionUseCase } from './start-workout-session.usecase';
import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession } from '../domain/workout-session.entity';

const mockSessionRepository = {
    findActiveSessionByUser: jest.fn(),
    createSession: jest.fn(),
};

describe('StartWorkoutSessionUseCase', () => {
    let service: StartWorkoutSessionUseCase;
    let repository: ISessionRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StartWorkoutSessionUseCase,
                {
                    provide: ISessionRepository,
                    useValue: mockSessionRepository,
                },
            ],
        }).compile();

        service = module.get<StartWorkoutSessionUseCase>(StartWorkoutSessionUseCase);
        repository = module.get<ISessionRepository>(ISessionRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new session if none active', async () => {
        mockSessionRepository.findActiveSessionByUser.mockResolvedValue(null);
        const sessionStub = { id: 'session-id' };
        mockSessionRepository.createSession.mockResolvedValue(sessionStub);

        const command = { userId: 'user1', trainingDayId: 'day1' };
        const result = await service.execute(command);

        expect(result).toBe(sessionStub);
        expect(mockSessionRepository.findActiveSessionByUser).toHaveBeenCalledWith('user1');
        expect(mockSessionRepository.createSession).toHaveBeenCalled();
    });

    it('should return existing session if one is active', async () => {
        const existingSession = { id: 'existing-session' };
        mockSessionRepository.findActiveSessionByUser.mockResolvedValue(existingSession);

        const command = { userId: 'user1', trainingDayId: 'day1' };
        const result = await service.execute(command);

        expect(result).toBe(existingSession);
        expect(mockSessionRepository.createSession).not.toHaveBeenCalled();
    });
});
