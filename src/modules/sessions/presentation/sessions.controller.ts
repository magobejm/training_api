import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { StartWorkoutSessionUseCase } from '../application/start-workout-session.usecase';
import { LogWorkoutSetUseCase } from '../application/log-workout-set.usecase';
import { CompleteWorkoutSessionUseCase } from '../application/complete-workout-session.usecase';
import { GetWorkoutSessionUseCase } from '../application/get-workout-session.usecase';
import { GetWorkoutHistoryUseCase } from '../application/get-workout-history.usecase';
import {
    StartSessionDto,
    LogSetDto,
    GetHistoryQueryDto,
} from './sessions.dto';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
    constructor(
        private readonly startSessionUseCase: StartWorkoutSessionUseCase,
        private readonly logSetUseCase: LogWorkoutSetUseCase,
        private readonly completeSessionUseCase: CompleteWorkoutSessionUseCase,
        private readonly getSessionUseCase: GetWorkoutSessionUseCase,
        private readonly getHistoryUseCase: GetWorkoutHistoryUseCase,
    ) { }

    @Post('start')
    async startSession(
        @Body() dto: StartSessionDto,
        @CurrentUser('sub') userId: string,
    ) {
        const session = await this.startSessionUseCase.execute({
            userId,
            trainingDayId: dto.trainingDayId,
        });

        return {
            id: session.id,
            userId: session.userId,
            trainingDayId: session.trainingDayId,
            status: session.status,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
            sets: session.sets.map((s) => ({
                id: s.id,
                dayExerciseId: s.dayExerciseId,
                setIndex: s.setIndex,
                weightDone: s.weightDone,
                repsDone: s.repsDone,
                rpeDone: s.rpeDone,
                volume: s.volume,
            })),
        };
    }

    @Post(':sessionId/sets')
    async logSet(
        @Param('sessionId') sessionId: string,
        @Body() dto: LogSetDto,
        @CurrentUser('sub') userId: string,
    ) {
        const set = await this.logSetUseCase.execute({
            sessionId,
            dayExerciseId: dto.dayExerciseId,
            setIndex: dto.setIndex,
            weightDone: dto.weightDone,
            repsDone: dto.repsDone,
            rpeDone: dto.rpeDone,
            userId,
        });

        return {
            id: set.id,
            sessionId: set.sessionId,
            dayExerciseId: set.dayExerciseId,
            setIndex: set.setIndex,
            weightDone: set.weightDone,
            repsDone: set.repsDone,
            rpeDone: set.rpeDone,
            volume: set.volume,
            createdAt: set.createdAt,
        };
    }

    @Patch(':sessionId/complete')
    async completeSession(
        @Param('sessionId') sessionId: string,
        @CurrentUser('sub') userId: string,
    ) {
        const session = await this.completeSessionUseCase.execute({
            sessionId,
            userId,
        });

        return {
            id: session.id,
            status: session.status,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
        };
    }

    @Get(':sessionId')
    async getSession(
        @Param('sessionId') sessionId: string,
        @CurrentUser('sub') userId: string,
    ) {
        const session = await this.getSessionUseCase.execute({
            sessionId,
            userId,
        });

        return {
            id: session.id,
            userId: session.userId,
            trainingDayId: session.trainingDayId,
            status: session.status,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            totalVolume: session.totalVolume,
            durationSeconds: session.durationSeconds,
            sets: session.sets.map((s) => ({
                id: s.id,
                dayExerciseId: s.dayExerciseId,
                setIndex: s.setIndex,
                weightDone: s.weightDone,
                repsDone: s.repsDone,
                rpeDone: s.rpeDone,
                volume: s.volume,
                createdAt: s.createdAt,
            })),
        };
    }

    @Get()
    async getHistory(
        @Query() query: GetHistoryQueryDto,
        @CurrentUser('sub') userId: string,
    ) {
        const sessions = await this.getHistoryUseCase.execute({
            userId,
            status: query.status,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
        });

        return {
            sessions: sessions.map((s) => ({
                id: s.id,
                trainingDayId: s.trainingDayId,
                status: s.status,
                startedAt: s.startedAt,
                completedAt: s.completedAt,
                totalVolume: s.totalVolume,
                durationSeconds: s.durationSeconds,
                setsCount: s.sets.length,
            })),
            total: sessions.length,
        };
    }
}
