import { Module } from '@nestjs/common';
import { SessionsController } from './presentation/sessions.controller';
import { StartWorkoutSessionUseCase } from './application/start-workout-session.usecase';
import { LogWorkoutSetUseCase } from './application/log-workout-set.usecase';
import { CompleteWorkoutSessionUseCase } from './application/complete-workout-session.usecase';
import { GetWorkoutSessionUseCase } from './application/get-workout-session.usecase';
import { GetWorkoutHistoryUseCase } from './application/get-workout-history.usecase';
import { PrismaSessionRepository } from './infra/prisma-session.repository';
import { ISessionRepository } from './domain/session.repository';

@Module({
    controllers: [SessionsController],
    providers: [
        // Use cases
        StartWorkoutSessionUseCase,
        LogWorkoutSetUseCase,
        CompleteWorkoutSessionUseCase,
        GetWorkoutSessionUseCase,
        GetWorkoutHistoryUseCase,
        // Repository
        {
            provide: ISessionRepository,
            useClass: PrismaSessionRepository,
        },
    ],
    exports: [ISessionRepository],
})
export class SessionsModule { }
