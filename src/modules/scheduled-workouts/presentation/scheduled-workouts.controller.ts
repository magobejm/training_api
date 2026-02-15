import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { ScheduledWorkoutsService } from '../application/scheduled-workouts.service';
import { CreateScheduledWorkoutDto, UpdateScheduledWorkoutDto } from './scheduled-workout.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';

@Controller('scheduled-workouts')
@UseGuards(JwtAuthGuard)
export class ScheduledWorkoutsController {
    constructor(private readonly service: ScheduledWorkoutsService) { }

    @Post()
    async create(
        @Body() dto: CreateScheduledWorkoutDto,
        @CurrentUser() user: AuthenticatedUser,
    ) {
        // If trainer, can schedule for anyone. If client, can only schedule for self (validation in service or here)
        // For now assuming trainer sends userId.
        return this.service.create({
            ...dto,
            trainerId: user.userId, // The logged in user is the "scheduler" (trainer) usually, or self.
        });
    }

    @Get()
    async findAll(@Query('userId') userId: string, @Query('from') from: string, @Query('to') to: string) {
        return this.service.findAll(userId, from ? new Date(from) : undefined, to ? new Date(to) : undefined);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateScheduledWorkoutDto,
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
