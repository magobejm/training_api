import { Test, TestingModule } from '@nestjs/testing';
import { CompleteWorkoutSessionUseCase } from './complete-workout-session.usecase';
import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession, SessionStatus } from '../domain/workout-session.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockSessionRepository = {
    findSessionById: jest.fn(),
    updateSession: jest.fn(),
};

describe('CompleteWorkoutSessionUseCase', () => {
    let service: CompleteWorkoutSessionUseCase;
    let repository: ISessionRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompleteWorkoutSessionUseCase,
                {
                    provide: ISessionRepository,
                    useValue: mockSessionRepository,
                },
            ],
        }).compile();

        service = module.get<CompleteWorkoutSessionUseCase>(CompleteWorkoutSessionUseCase);
        repository = module.get<ISessionRepository>(ISessionRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should complete a session successfully', async () => {
        const session = new WorkoutSession(
            'session-id',
            'user1',
            'day-id',
            SessionStatus.IN_PROGRESS,
            new Date(),
            null,
            [],
            new Date(),
            new Date()
        );

        mockSessionRepository.findSessionById.mockResolvedValue(session);

        // We expect the use case to call session.complete() which updates status and completedAt
        // And then call updateSession.
        // Since we are mocking the repo, we can check if updateSession is called with a completed session.

        mockSessionRepository.updateSession.mockImplementation((s) => Promise.resolve(s));

        const result = await service.execute({ sessionId: 'session-id', userId: 'user1' });

        expect(result.status).toBe(SessionStatus.COMPLETED);
        expect(result.completedAt).toBeDefined();
        expect(mockSessionRepository.updateSession).toHaveBeenCalled();
    });

    it('should return already completed session without updating', async () => {
        const session = new WorkoutSession(
            'session-id',
            'user1',
            'day-id',
            SessionStatus.COMPLETED,
            new Date(),
            new Date(),
            [],
            new Date(),
            new Date()
        );
        mockSessionRepository.findSessionById.mockResolvedValue(session);

        const result = await service.execute({ sessionId: 'session-id', userId: 'user1' });

        expect(result).toBe(session);
        expect(mockSessionRepository.updateSession).not.toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not owner', async () => {
        const session = new WorkoutSession(
            'session-id',
            'owner',
            'day-id',
            SessionStatus.IN_PROGRESS,
            new Date(),
            null,
            [],
            new Date(),
            new Date()
        );
        mockSessionRepository.findSessionById.mockResolvedValue(session);

        await expect(service.execute({ sessionId: 'session-id', userId: 'other' })).rejects.toThrow(ForbiddenException);
    });
});
