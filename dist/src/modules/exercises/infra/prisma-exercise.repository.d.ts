import { PrismaService } from '../../../prisma/prisma.service';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
export declare class PrismaExerciseRepository implements IExerciseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(exercise: Exercise): Promise<Exercise>;
    findAll(userId: string): Promise<Exercise[]>;
    findById(id: string): Promise<Exercise | null>;
    update(id: string, data: Partial<Exercise>): Promise<Exercise>;
    delete(id: string): Promise<void>;
    findAllByIds(ids: string[]): Promise<Exercise[]>;
    hasDayExercises(id: string): Promise<boolean>;
    findAllMuscleGroups(): Promise<{
        id: string;
        name: string;
        imageUrl: string | null;
    }[]>;
    private mapToDomain;
}
