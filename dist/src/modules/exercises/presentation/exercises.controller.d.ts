import { CreateExerciseUseCase } from '../application/create-exercise.usecase';
import { GetExercisesUseCase } from '../application/get-exercises.usecase';
import { CreateExerciseDto } from './create-exercise.dto';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
export declare class ExercisesController {
    private readonly createExerciseUseCase;
    private readonly getExercisesUseCase;
    constructor(createExerciseUseCase: CreateExerciseUseCase, getExercisesUseCase: GetExercisesUseCase);
    create(dto: CreateExerciseDto, user: AuthenticatedUser): Promise<import("../domain/exercise.entity").Exercise>;
    findAll(): Promise<import("../domain/exercise.entity").Exercise[]>;
}
