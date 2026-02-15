import { Module } from '@nestjs/common';
import { CreateExerciseUseCase } from './application/create-exercise.usecase';
import { GetExercisesUseCase } from './application/get-exercises.usecase';
import { GetExerciseByIdUseCase } from './application/get-exercise-by-id.usecase';
import { UpdateExerciseUseCase } from './application/update-exercise.usecase';
import { DeleteExerciseUseCase } from './application/delete-exercise.usecase';
import { PrismaExerciseRepository } from './infra/prisma-exercise.repository';
import { ExercisesController } from './presentation/exercises.controller';
import { IExerciseRepository } from './domain/exercise.repository';

@Module({
  controllers: [ExercisesController],
  providers: [
    CreateExerciseUseCase,
    GetExercisesUseCase,
    GetExerciseByIdUseCase,
    UpdateExerciseUseCase,
    DeleteExerciseUseCase,
    {
      provide: IExerciseRepository,
      useClass: PrismaExerciseRepository,
    },
  ],
  exports: [IExerciseRepository],
})
export class ExercisesModule { }
