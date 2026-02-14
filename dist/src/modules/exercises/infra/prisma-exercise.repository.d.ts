import { PrismaService } from '../../../prisma/prisma.service';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';
export declare class PrismaExerciseRepository implements IExerciseRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(exercise: Exercise): Promise<Exercise>;
    findAll(): Promise<Exercise[]>;
    findById(id: string): Promise<Exercise | null>;
    update(id: string, data: Partial<Exercise>): Promise<Exercise>;
    delete(id: string): Promise<void>;
    private mapToDomain;
}
