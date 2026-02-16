import { Module } from '@nestjs/common';
import { CreateExerciseUseCase } from './application/create-exercise.usecase';
import { GetExercisesUseCase } from './application/get-exercises.usecase';
import { GetExerciseByIdUseCase } from './application/get-exercise-by-id.usecase';
import { UpdateExerciseUseCase } from './application/update-exercise.usecase';
import { DeleteExerciseUseCase } from './application/delete-exercise.usecase';
import { PrismaExerciseRepository } from './infra/prisma-exercise.repository';
import { ExercisesController } from './presentation/exercises.controller';
import { IExerciseRepository } from './domain/exercise.repository';

import { MuscleGroupsController } from './presentation/muscle-groups.controller';
import { GetMuscleGroupsUseCase } from './application/get-muscle-groups.usecase';

@Module({
  controllers: [ExercisesController, MuscleGroupsController],
  providers: [
    CreateExerciseUseCase,
    GetExercisesUseCase,
    GetExerciseByIdUseCase,
    UpdateExerciseUseCase,
    DeleteExerciseUseCase,
    GetMuscleGroupsUseCase,
    {
      provide: IExerciseRepository,
      useClass: PrismaExerciseRepository,
    },
  ],
  exports: [IExerciseRepository],
})
export class ExercisesModule { }
