import { Module } from '@nestjs/common';
import { CreateExerciseUseCase } from './application/create-exercise.usecase';
import { GetExercisesUseCase } from './application/get-exercises.usecase';
import { PrismaExerciseRepository } from './infra/prisma-exercise.repository';
import { ExercisesController } from './presentation/exercises.controller';
import { IExerciseRepository } from './domain/exercise.repository';

@Module({
  controllers: [ExercisesController],
  providers: [
    CreateExerciseUseCase,
    GetExercisesUseCase,
    {
      provide: IExerciseRepository,
      useClass: PrismaExerciseRepository,
    },
  ],
  exports: [IExerciseRepository],
})
export class ExercisesModule {}
