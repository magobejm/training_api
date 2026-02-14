import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateTrainingPlanUseCase } from '../application/create-training-plan.usecase';
import { GetTrainingPlanUseCase } from '../application/get-training-plan.usecase';
import { GetTrainingPlansUseCase } from '../application/get-training-plans.usecase';
import { AddExerciseToDayUseCase } from '../application/add-exercise-to-day.usecase';
import { AddDayToPlanUseCase } from '../application/add-day-to-plan.usecase';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsUUID,
  IsUrl,
} from 'class-validator';

class CreatePlanDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class CreateDayDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  order: number;
}

class AddExerciseDto {
  @IsUUID()
  exerciseId: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsInt()
  @Min(1)
  targetSets: number;

  @IsString()
  targetReps: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  targetRir?: number;

  @IsInt()
  @Min(0)
  restSeconds: number;

  @IsOptional()
  @IsString()
  customDescription?: string;

  @IsOptional()
  @IsUrl()
  customVideoUrl?: string;

  @IsOptional()
  @IsUrl()
  customImageUrl?: string;

  @IsOptional()
  @IsString()
  coachNotes?: string;
}

@Controller('training-plans')
@UseGuards(JwtAuthGuard)
export class TrainingController {
  constructor(
    private readonly createPlanUseCase: CreateTrainingPlanUseCase,
    private readonly getPlanUseCase: GetTrainingPlanUseCase,
    private readonly getPlansUseCase: GetTrainingPlansUseCase,
    private readonly addDayUseCase: AddDayToPlanUseCase,
    private readonly addExerciseUseCase: AddExerciseToDayUseCase,
  ) { }

  @Post()
  async createPlan(
    @Body() dto: CreatePlanDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.createPlanUseCase.execute({ ...dto, authorId: user.userId });
  }

  @Get()
  async getPlans(@CurrentUser() user: AuthenticatedUser) {
    return this.getPlansUseCase.execute(user.userId);
  }

  @Get(':id')
  async getPlan(@Param('id') id: string) {
    const plan = await this.getPlanUseCase.execute(id);
    if (!plan) throw new NotFoundException('Plan not found');
    return plan;
  }

  @Post(':id/days')
  async createDay(
    @Param('id') planId: string,
    @Body() dto: CreateDayDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.addDayUseCase.execute({
      planId,
      ...dto,
      userId: user.userId,
    });
  }

  @Post(':planId/days/:dayId/exercises')
  async addExercise(
    @Param('planId') planId: string, // Kept for URL structure, but use case uses dayId
    @Param('dayId') dayId: string,
    @Body() dto: AddExerciseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.addExerciseUseCase.execute({
      dayId,
      ...dto,
      targetRir: dto.targetRir ?? null,
      userId: user.userId,
    });
  }
}
