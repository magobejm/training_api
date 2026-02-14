import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateExerciseUseCase } from '../application/create-exercise.usecase';
import { GetExercisesUseCase } from '../application/get-exercises.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateExerciseDto } from './create-exercise.dto';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(
    private readonly createExerciseUseCase: CreateExerciseUseCase,
    private readonly getExercisesUseCase: GetExercisesUseCase,
  ) { }

  @Post()
  async create(
    @Body() dto: CreateExerciseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createExerciseUseCase.execute({ ...dto, userId: user.userId });
  }

  @Get()
  async findAll() {
    return this.getExercisesUseCase.execute();
  }
}
