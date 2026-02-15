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
exports.PrismaTrainingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const training_plan_entity_1 = require("../domain/training-plan.entity");
const training_day_entity_1 = require("../domain/training-day.entity");
const day_exercise_entity_1 = require("../domain/day-exercise.entity");
const exercise_entity_1 = require("../../exercises/domain/exercise.entity");
let PrismaTrainingRepository = class PrismaTrainingRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlan(plan) {
        const raw = await this.prisma.trainingPlan.create({
            data: {
                id: plan.id,
                name: plan.name,
                description: plan.description,
                authorId: plan.authorId,
                createdAt: plan.createdAt,
                updatedAt: plan.updatedAt,
                days: {
                    create: plan.days.map((day) => ({
                        id: day.id,
                        name: day.name,
                        order: day.order,
                        createdAt: day.createdAt,
                        updatedAt: day.updatedAt,
                        exercises: {
                            create: day.exercises.map((dayTx) => ({
                                id: dayTx.id,
                                exerciseId: dayTx.exercise.id,
                                order: dayTx.order,
                                targetSets: dayTx.targetSets,
                                targetReps: dayTx.targetReps,
                                targetRir: dayTx.targetRir,
                                restSeconds: dayTx.restSeconds,
                                customDescription: dayTx.customDescription,
                                customVideoUrl: dayTx.customVideoUrl,
                                customImageUrl: dayTx.customImageUrl,
                                coachNotes: dayTx.coachNotes,
                            })),
                        },
                    })),
                },
            },
            include: {
                days: {
                    orderBy: { order: 'asc' },
                    include: {
                        exercises: {
                            orderBy: { order: 'asc' },
                            include: { exercise: true },
                        },
                    },
                },
            },
        });
        return this.mapPlanToDomain(raw);
    }
    async createDay(day) {
        const raw = await this.prisma.trainingDay.create({
            data: {
                id: day.id,
                name: day.name,
                order: day.order,
                planId: day.planId,
                createdAt: day.createdAt,
                updatedAt: day.updatedAt,
            },
            include: {
                exercises: {
                    include: { exercise: true },
                },
            },
        });
        return this.mapDayToDomain(raw);
    }
    async getDayById(id) {
        const raw = await this.prisma.trainingDay.findUnique({
            where: { id },
            include: {
                exercises: {
                    include: { exercise: true },
                },
            },
        });
        if (!raw)
            return null;
        return this.mapDayToDomain(raw);
    }
    async addExerciseToDay(dayExercise) {
        const raw = await this.prisma.dayExercise.create({
            data: {
                id: dayExercise.id,
                dayId: dayExercise.dayId,
                exerciseId: dayExercise.exercise.id,
                order: dayExercise.order,
                targetSets: dayExercise.targetSets,
                targetReps: dayExercise.targetReps,
                targetRir: dayExercise.targetRir,
                restSeconds: dayExercise.restSeconds,
                customDescription: dayExercise.customDescription,
                customVideoUrl: dayExercise.customVideoUrl,
                customImageUrl: dayExercise.customImageUrl,
                coachNotes: dayExercise.coachNotes,
            },
            include: {
                exercise: true,
            },
        });
        return this.mapDayExerciseToDomain(raw);
    }
    async getPlanById(id) {
        const raw = await this.prisma.trainingPlan.findUnique({
            where: { id },
            include: {
                days: {
                    orderBy: { order: 'asc' },
                    include: {
                        exercises: {
                            orderBy: { order: 'asc' },
                            include: { exercise: true },
                        },
                    },
                },
            },
        });
        if (!raw)
            return null;
        return this.mapPlanToDomain(raw);
    }
    async findAll(authorId) {
        const raw = await this.prisma.trainingPlan.findMany({
            where: {
                authorId,
                deletedAt: null,
            },
            include: {
                days: {
                    orderBy: { order: 'asc' },
                    include: {
                        exercises: {
                            orderBy: { order: 'asc' },
                            include: { exercise: true },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return raw.map((plan) => this.mapPlanToDomain(plan));
    }
    mapPlanToDomain(raw) {
        return new training_plan_entity_1.TrainingPlan(raw.id, raw.name, raw.description, raw.authorId, raw.days.map((d) => this.mapDayToDomain(d)), raw.createdAt, raw.updatedAt);
    }
    mapDayToDomain(raw) {
        return new training_day_entity_1.TrainingDay(raw.id, raw.name, raw.order, raw.planId, raw.exercises.map((e) => this.mapDayExerciseToDomain(e)), raw.createdAt, raw.updatedAt);
    }
    mapDayExerciseToDomain(raw) {
        const baseExercise = new exercise_entity_1.Exercise(raw.exercise.id, raw.exercise.name, raw.exercise.description, raw.exercise.muscleGroup, raw.exercise.defaultVideoUrl, raw.exercise.defaultImageUrl, raw.exercise.thumbnailUrl, raw.exercise.createdAt, raw.exercise.updatedAt, raw.exercise.createdBy, raw.exercise.updatedBy, raw.exercise.deletedAt, raw.exercise.deletedBy);
        return new day_exercise_entity_1.DayExercise(raw.id, raw.dayId, baseExercise, raw.order, raw.customDescription, raw.customVideoUrl, raw.customImageUrl, raw.coachNotes, raw.targetSets, raw.targetReps, raw.targetRir, raw.restSeconds);
    }
    async deletePlan(id) {
        await this.prisma.trainingPlan.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async hasScheduledWorkouts(planId) {
        const count = await this.prisma.scheduledWorkout.count({
            where: {
                trainingDay: {
                    planId,
                },
                completed: false,
            },
        });
        return count > 0;
    }
    async hasActiveUsers(planId) {
        const count = await this.prisma.user.count({
            where: {
                activePlanId: planId,
                deletedAt: null,
            },
        });
        return count > 0;
    }
};
exports.PrismaTrainingRepository = PrismaTrainingRepository;
exports.PrismaTrainingRepository = PrismaTrainingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTrainingRepository);
//# sourceMappingURL=prisma-training.repository.js.map