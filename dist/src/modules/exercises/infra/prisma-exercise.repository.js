"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExerciseRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const exercise_entity_1 = require("../domain/exercise.entity");
let PrismaExerciseRepository = class PrismaExerciseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(exercise) {
        const raw = await this.prisma.exercise.create({
            data: {
                id: exercise.id,
                name: exercise.name,
                description: exercise.description,
                defaultVideoUrl: exercise.defaultVideoUrl,
                defaultImageUrl: exercise.defaultImageUrl,
                thumbnailUrl: exercise.thumbnailUrl,
                createdAt: exercise.createdAt,
                updatedAt: exercise.updatedAt,
                createdBy: exercise.createdBy,
                updatedBy: exercise.updatedBy,
                muscleGroupId: exercise.muscleGroupDetails?.id,
                trainerId: exercise.trainerId,
            },
            include: {
                targetMuscleGroup: true,
            },
        });
        return this.mapToDomain(raw);
    }
    async findAll(userId) {
        const raw = await this.prisma.exercise.findMany({
            where: {
                deletedAt: null,
                OR: [
                    { trainerId: null },
                    { trainerId: userId },
                ],
            },
            include: {
                targetMuscleGroup: true,
            },
        });
        return raw.map((item) => this.mapToDomain(item));
    }
    async findById(id) {
        const raw = await this.prisma.exercise.findUnique({
            where: { id },
            include: {
                targetMuscleGroup: true,
            },
        });
        if (!raw || raw.deletedAt)
            return null;
        return this.mapToDomain(raw);
    }
    async update(id, data) {
        const raw = await this.prisma.exercise.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                defaultVideoUrl: data.defaultVideoUrl,
                defaultImageUrl: data.defaultImageUrl,
                thumbnailUrl: data.thumbnailUrl,
                updatedAt: new Date(),
                updatedBy: data.updatedBy,
                muscleGroupId: data.muscleGroupDetails?.id,
            },
            include: {
                targetMuscleGroup: true,
            },
        });
        return this.mapToDomain(raw);
    }
    async delete(id) {
        await this.prisma.exercise.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findAllByIds(ids) {
        const raw = await this.prisma.exercise.findMany({
            where: { id: { in: ids }, deletedAt: null },
            include: { targetMuscleGroup: true },
        });
        return raw.map((item) => this.mapToDomain(item));
    }
    async hasDayExercises(id) {
        const count = await this.prisma.dayExercise.count({
            where: { exerciseId: id },
        });
        return count > 0;
    }
    async findAllMuscleGroups() {
        return this.prisma.muscleGroup.findMany({
            orderBy: { name: 'asc' },
        });
    }
    mapToDomain(raw) {
        return new exercise_entity_1.Exercise(raw.id, raw.name, raw.description, raw.targetMuscleGroup?.name || 'UNKNOWN', raw.defaultVideoUrl, raw.defaultImageUrl, raw.thumbnailUrl, raw.createdAt, raw.updatedAt, raw.createdBy, raw.updatedBy, raw.deletedAt, raw.deletedBy, raw.trainerId, raw.targetMuscleGroup ? {
            id: raw.targetMuscleGroup.id,
            name: raw.targetMuscleGroup.name,
            imageUrl: raw.targetMuscleGroup.imageUrl
        } : undefined);
    }
};
exports.PrismaExerciseRepository = PrismaExerciseRepository;
exports.PrismaExerciseRepository = PrismaExerciseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaExerciseRepository);
//# sourceMappingURL=prisma-exercise.repository.js.map