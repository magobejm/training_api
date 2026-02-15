import { Injectable } from '@nestjs/common';
import { Exercise as PrismaExercise } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class PrismaExerciseRepository implements IExerciseRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(exercise: Exercise): Promise<Exercise> {
    const raw = await this.prisma.exercise.create({
      data: {
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        muscleGroup: exercise.muscleGroup,
        defaultVideoUrl: exercise.defaultVideoUrl,
        defaultImageUrl: exercise.defaultImageUrl,
        thumbnailUrl: exercise.thumbnailUrl,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
        createdBy: exercise.createdBy,
        updatedBy: exercise.updatedBy,
        muscleGroupId: exercise.muscleGroupDetails?.id, // If provided (unlikely in create, usually handled by service/logic)
      },
      include: {
        targetMuscleGroup: true,
      },
    });
    return this.mapToDomain(raw);
  }

  async findAll(): Promise<Exercise[]> {
    const raw = await this.prisma.exercise.findMany({
      where: { deletedAt: null },
      include: {
        targetMuscleGroup: true,
      },
    });
    return raw.map((item) => this.mapToDomain(item));
  }

  async findById(id: string): Promise<Exercise | null> {
    const raw = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        targetMuscleGroup: true,
      },
    });
    if (!raw || raw.deletedAt) return null;
    return this.mapToDomain(raw);
  }

  async update(id: string, data: Partial<Exercise>): Promise<Exercise> {
    const raw = await this.prisma.exercise.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        muscleGroup: data.muscleGroup,
        defaultVideoUrl: data.defaultVideoUrl,
        defaultImageUrl: data.defaultImageUrl,
        thumbnailUrl: data.thumbnailUrl,
        updatedAt: new Date(),
        updatedBy: data.updatedBy,
      },
      include: {
        targetMuscleGroup: true,
      },
    });
    return this.mapToDomain(raw);
  }

  async delete(id: string): Promise<void> {
    // Soft delete
    await this.prisma.exercise.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findAllByIds(ids: string[]): Promise<Exercise[]> {
    const raw = await this.prisma.exercise.findMany({
      where: {
        id: { in: ids },
        deletedAt: null,
      },
      include: {
        targetMuscleGroup: true,
      },
    });
    return raw.map((item) => this.mapToDomain(item));
  }

  async hasDayExercises(id: string): Promise<boolean> {
    const count = await this.prisma.dayExercise.count({
      where: {
        exerciseId: id,
        deletedAt: null,
      },
    });
    return count > 0;
  }

  private mapToDomain(raw: PrismaExercise & { targetMuscleGroup?: { id: string, name: string, imageUrl: string | null } | null }): Exercise {
    return new Exercise(
      raw.id,
      raw.name,
      raw.description,
      raw.muscleGroup,
      raw.defaultVideoUrl,
      raw.defaultImageUrl,
      raw.thumbnailUrl,
      raw.createdAt,
      raw.updatedAt,
      raw.createdBy,
      raw.updatedBy,
      raw.deletedAt,
      raw.deletedBy,
      raw.targetMuscleGroup ? {
        id: raw.targetMuscleGroup.id,
        name: raw.targetMuscleGroup.name,
        imageUrl: raw.targetMuscleGroup.imageUrl
      } : undefined,
    );
  }
}
