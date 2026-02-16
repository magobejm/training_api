import { Test, TestingModule } from '@nestjs/testing';
import { LogWorkoutSetUseCase } from './log-workout-set.usecase';
import { ISessionRepository } from '../domain/session.repository';
import { WorkoutSession, SessionStatus } from '../domain/workout-session.entity';
import { WorkoutSet } from '../domain/workout-session.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockSessionRepository = {
    findSessionById: jest.fn(),
    addSetToSession: jest.fn(),
};

describe('LogWorkoutSetUseCase', () => {
    let service: LogWorkoutSetUseCase;
    let repository: ISessionRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LogWorkoutSetUseCase,
                {
                    provide: ISessionRepository,
                    useValue: mockSessionRepository,
                },
            ],
        }).compile();

        service = module.get<LogWorkoutSetUseCase>(LogWorkoutSetUseCase);
        repository = module.get<ISessionRepository>(ISessionRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log a workout set successfully', async () => {
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

        // Mock the return of addSetToSession
        const expectedSet = new WorkoutSet('set-id', 'session-id', 'ex1', 1, 100, 10, 8, null, null, new Date());
        mockSessionRepository.addSetToSession.mockResolvedValue(expectedSet);

        const command = {
            sessionId: 'session-id',
            dayExerciseId: 'ex1',
            setIndex: 1,
            weightDone: 100,
            repsDone: 10,
            rpeDone: 8,
            userId: 'user1',
        };

        const result = await service.execute(command);

        expect(result).toEqual(expectedSet);
        expect(mockSessionRepository.addSetToSession).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if user is not owner', async () => {
        const session = new WorkoutSession(
            'session-id',
            'owner-user',
            'day-id',
            SessionStatus.IN_PROGRESS,
            new Date(),
            null,
            [],
            new Date(),
            new Date()
        );
        mockSessionRepository.findSessionById.mockResolvedValue(session);

        const command = {
            sessionId: 'session-id',
            dayExerciseId: 'ex1',
            setIndex: 1,
            weightDone: 100,
            repsDone: 10,
            userId: 'other-user',
        };

        await expect(service.execute(command)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if session is completed', async () => {
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

        const command = {
            sessionId: 'session-id',
            dayExerciseId: 'ex1',
            setIndex: 1,
            weightDone: 100,
            repsDone: 10,
            userId: 'user1',
        };

        await expect(service.execute(command)).rejects.toThrow(ForbiddenException);
    });
});
