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
exports.AddExerciseToDayUseCase = void 0;
const common_1 = require("@nestjs/common");
const training_repository_1 = require("../domain/training.repository");
const day_exercise_entity_1 = require("../domain/day-exercise.entity");
const exercise_repository_1 = require("../../exercises/domain/exercise.repository");
let AddExerciseToDayUseCase = class AddExerciseToDayUseCase {
    trainingRepository;
    exerciseRepository;
    constructor(trainingRepository, exerciseRepository) {
        this.trainingRepository = trainingRepository;
        this.exerciseRepository = exerciseRepository;
    }
    async execute(command) {
        const exercise = await this.exerciseRepository.findById(command.exerciseId);
        if (!exercise) {
            throw new common_1.NotFoundException(`Exercise with ID ${command.exerciseId} not found`);
        }
        const day = await this.trainingRepository.getDayById(command.dayId);
        if (!day) {
            throw new common_1.NotFoundException(`Training Day with ID ${command.dayId} not found`);
        }
        const plan = await this.trainingRepository.getPlanById(day.planId);
        if (!plan) {
            throw new common_1.NotFoundException(`Training Plan with ID ${day.planId} not found`);
        }
        if (plan.authorId !== command.userId) {
            throw new common_1.ForbiddenException('You are not allowed to modify this plan');
        }
        const dayExercise = new day_exercise_entity_1.DayExercise(crypto.randomUUID(), command.dayId, exercise, command.order, command.customDescription || null, command.customVideoUrl || null, command.customImageUrl || null, command.coachNotes || null, command.targetSets, command.targetReps, command.targetRir || null, command.restSeconds);
        return this.trainingRepository.addExerciseToDay(dayExercise);
    }
};
exports.AddExerciseToDayUseCase = AddExerciseToDayUseCase;
exports.AddExerciseToDayUseCase = AddExerciseToDayUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(training_repository_1.ITrainingRepository)),
    __param(1, (0, common_1.Inject)(exercise_repository_1.IExerciseRepository)),
    __metadata("design:paramtypes", [Object, Object])
], AddExerciseToDayUseCase);
//# sourceMappingURL=add-exercise-to-day.usecase.js.map