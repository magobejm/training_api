import { Module } from '@nestjs/common';
import { ExercisesModule } from '../exercises/exercises.module';
import { PrismaTrainingRepository } from './infra/prisma-training.repository';
import { ITrainingRepository } from './domain/training.repository';
import { CreateTrainingPlanUseCase } from './application/create-training-plan.usecase';
import { GetTrainingPlanUseCase } from './application/get-training-plan.usecase';
import { AddExerciseToDayUseCase } from './application/add-exercise-to-day.usecase';
import { TrainingController } from './presentation/training.controller';
import { AddDayToPlanUseCase } from './application/add-day-to-plan.usecase';
import { GetTrainingPlansUseCase } from './application/get-training-plans.usecase';

@Module({
  imports: [ExercisesModule],
  controllers: [TrainingController],
  providers: [
    CreateTrainingPlanUseCase,
    GetTrainingPlanUseCase,
    GetTrainingPlansUseCase,
    AddDayToPlanUseCase,
    AddExerciseToDayUseCase,
    {
      provide: ITrainingRepository,
      useClass: PrismaTrainingRepository,
    },
  ],
})
export class TrainingModule {}
