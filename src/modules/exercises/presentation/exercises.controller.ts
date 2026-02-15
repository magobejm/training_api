import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateExerciseUseCase } from '../application/create-exercise.usecase';
import { GetExercisesUseCase } from '../application/get-exercises.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateExerciseDto } from './create-exercise.dto';
import { UpdateExerciseDto } from './update-exercise.dto';
import { GetExerciseByIdUseCase } from '../application/get-exercise-by-id.usecase';
import { UpdateExerciseUseCase } from '../application/update-exercise.usecase';
import { DeleteExerciseUseCase } from '../application/delete-exercise.usecase';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(
    private readonly createExerciseUseCase: CreateExerciseUseCase,
    private readonly getExercisesUseCase: GetExercisesUseCase,
    private readonly getExerciseByIdUseCase: GetExerciseByIdUseCase,
    private readonly updateExerciseUseCase: UpdateExerciseUseCase,
    private readonly deleteExerciseUseCase: DeleteExerciseUseCase,
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getExerciseByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateExerciseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.updateExerciseUseCase.execute({
      id,
      data: dto,
      userId: user.userId,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.deleteExerciseUseCase.execute({
      id,
      userId: user.userId,
    });
  }
}
