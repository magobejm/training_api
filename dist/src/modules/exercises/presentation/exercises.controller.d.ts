import { CreateExerciseUseCase } from '../application/create-exercise.usecase';
import { GetExercisesUseCase } from '../application/get-exercises.usecase';
import { CreateExerciseDto } from './create-exercise.dto';
import { UpdateExerciseDto } from './update-exercise.dto';
import { GetExerciseByIdUseCase } from '../application/get-exercise-by-id.usecase';
import { UpdateExerciseUseCase } from '../application/update-exercise.usecase';
import { DeleteExerciseUseCase } from '../application/delete-exercise.usecase';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
export declare class ExercisesController {
    private readonly createExerciseUseCase;
    private readonly getExercisesUseCase;
    private readonly getExerciseByIdUseCase;
    private readonly updateExerciseUseCase;
    private readonly deleteExerciseUseCase;
    constructor(createExerciseUseCase: CreateExerciseUseCase, getExercisesUseCase: GetExercisesUseCase, getExerciseByIdUseCase: GetExerciseByIdUseCase, updateExerciseUseCase: UpdateExerciseUseCase, deleteExerciseUseCase: DeleteExerciseUseCase);
    create(dto: CreateExerciseDto, user: AuthenticatedUser): Promise<import("../domain/exercise.entity").Exercise>;
    findAll(user: AuthenticatedUser): Promise<import("../domain/exercise.entity").Exercise[]>;
    findOne(id: string): Promise<import("../domain/exercise.entity").Exercise>;
    update(id: string, dto: UpdateExerciseDto, user: AuthenticatedUser): Promise<import("../domain/exercise.entity").Exercise>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
