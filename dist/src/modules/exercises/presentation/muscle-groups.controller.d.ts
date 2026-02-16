import { GetMuscleGroupsUseCase } from '../application/get-muscle-groups.usecase';
export declare class MuscleGroupsController {
    private readonly getMuscleGroupsUseCase;
    constructor(getMuscleGroupsUseCase: GetMuscleGroupsUseCase);
    findAll(): Promise<{
        id: string;
        name: string;
        imageUrl: string | null;
    }[]>;
}
