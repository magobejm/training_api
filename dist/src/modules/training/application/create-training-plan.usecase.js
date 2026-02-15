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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTrainingPlanUseCase = void 0;
const common_1 = require("@nestjs/common");
const training_repository_1 = require("../domain/training.repository");
const exercise_repository_1 = require("../../exercises/domain/exercise.repository");
const training_plan_entity_1 = require("../domain/training-plan.entity");
const training_day_entity_1 = require("../domain/training-day.entity");
const day_exercise_entity_1 = require("../domain/day-exercise.entity");
let CreateTrainingPlanUseCase = class CreateTrainingPlanUseCase {
    trainingRepository;
    exerciseRepository;
    constructor(trainingRepository, exerciseRepository) {
        this.trainingRepository = trainingRepository;
        this.exerciseRepository = exerciseRepository;
    }
    async execute(command) {
        const exerciseIds = command.days?.flatMap(d => d.exercises?.map(e => e.exerciseId) || []) || [];
        const uniqueExerciseIds = [...new Set(exerciseIds)];
        let exercisesMap = new Map();
        if (uniqueExerciseIds.length > 0) {
            const exercises = await this.exerciseRepository.findAllByIds(uniqueExerciseIds);
            if (exercises.length !== uniqueExerciseIds.length) {
                throw new common_1.NotFoundException('Some exercises were not found');
            }
            exercisesMap = new Map(exercises.map(e => [e.id, e]));
        }
        const planId = crypto.randomUUID();
        const now = new Date();
        const trainingDays = command.days?.map(dayDto => {
            const dayId = crypto.randomUUID();
            const dayExercises = dayDto.exercises?.map(exDto => {
                const exercise = exercisesMap.get(exDto.exerciseId);
                if (!exercise)
                    throw new common_1.NotFoundException(`Exercise ${exDto.exerciseId} not found`);
                return new day_exercise_entity_1.DayExercise(crypto.randomUUID(), dayId, exercise, exDto.order, exDto.customDescription || null, exDto.customVideoUrl || null, exDto.customImageUrl || null, exDto.coachNotes || null, exDto.targetSets, exDto.targetReps, exDto.targetRir || null, exDto.restSeconds);
            }) || [];
            return new training_day_entity_1.TrainingDay(dayId, dayDto.name, dayDto.order, planId, dayExercises, now, now);
        }) || [];
        const plan = new training_plan_entity_1.TrainingPlan(planId, command.name, command.description || null, command.authorId, trainingDays, now, now);
        return this.trainingRepository.createPlan(plan);
    }
};
exports.CreateTrainingPlanUseCase = CreateTrainingPlanUseCase;
exports.CreateTrainingPlanUseCase = CreateTrainingPlanUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(training_repository_1.ITrainingRepository)),
    __param(1, (0, common_1.Inject)(exercise_repository_1.IExerciseRepository)),
    __metadata("design:paramtypes", [Object, Object])
], CreateTrainingPlanUseCase);
//# sourceMappingURL=create-training-plan.usecase.js.map