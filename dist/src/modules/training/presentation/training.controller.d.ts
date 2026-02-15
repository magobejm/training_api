import { CreateTrainingPlanUseCase } from '../application/create-training-plan.usecase';
import { GetTrainingPlanUseCase } from '../application/get-training-plan.usecase';
import { GetTrainingPlansUseCase } from '../application/get-training-plans.usecase';
import { AddExerciseToDayUseCase } from '../application/add-exercise-to-day.usecase';
import { AddDayToPlanUseCase } from '../application/add-day-to-plan.usecase';
import { DeleteTrainingPlanUseCase } from '../application/delete-training-plan.usecase';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
declare class CreateDayExerciseDto {
    exerciseId: string;
    order: number;
    targetSets: number;
    targetReps: string;
    targetRir?: number;
    restSeconds: number;
    customDescription?: string;
    customVideoUrl?: string;
    customImageUrl?: string;
    coachNotes?: string;
}
declare class CreateDayDto {
    name: string;
    order: number;
    exercises?: CreateDayExerciseDto[];
}
declare class CreatePlanDto {
    name: string;
    description?: string;
    days?: CreateDayDto[];
}
declare class AddExerciseDto {
    exerciseId: string;
    order: number;
    targetSets: number;
    targetReps: string;
    targetRir?: number;
    restSeconds: number;
    customDescription?: string;
    customVideoUrl?: string;
    customImageUrl?: string;
    coachNotes?: string;
}
export declare class TrainingController {
    private readonly createPlanUseCase;
    private readonly getPlanUseCase;
    private readonly getPlansUseCase;
    private readonly addDayUseCase;
    private readonly addExerciseUseCase;
    private readonly deletePlanUseCase;
    constructor(createPlanUseCase: CreateTrainingPlanUseCase, getPlanUseCase: GetTrainingPlanUseCase, getPlansUseCase: GetTrainingPlansUseCase, addDayUseCase: AddDayToPlanUseCase, addExerciseUseCase: AddExerciseToDayUseCase, deletePlanUseCase: DeleteTrainingPlanUseCase);
    createPlan(dto: CreatePlanDto, user: AuthenticatedUser): Promise<import("../domain/training-plan.entity").TrainingPlan>;
    getPlans(user: AuthenticatedUser): Promise<import("../domain/training-plan.entity").TrainingPlan[]>;
    getPlan(id: string): Promise<import("../domain/training-plan.entity").TrainingPlan>;
    deletePlan(id: string, user: AuthenticatedUser): Promise<void>;
    createDay(planId: string, dto: CreateDayDto, user: AuthenticatedUser): Promise<import("../domain/training-day.entity").TrainingDay>;
    addExercise(planId: string, dayId: string, dto: AddExerciseDto, user: AuthenticatedUser): Promise<import("../domain/day-exercise.entity").DayExercise>;
}
export {};
