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
exports.CreateExerciseUseCase = void 0;
const common_1 = require("@nestjs/common");
const exercise_entity_1 = require("../domain/exercise.entity");
const exercise_repository_1 = require("../domain/exercise.repository");
let CreateExerciseUseCase = class CreateExerciseUseCase {
    exerciseRepository;
    constructor(exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }
    async execute(command) {
        const muscleGroups = await this.exerciseRepository.findAllMuscleGroups();
        const muscleGroupRecord = muscleGroups.find(mg => mg.name === command.muscleGroup);
        const exercise = exercise_entity_1.Exercise.create(command.name, command.description, command.muscleGroup, command.videoUrl || null, command.imageUrl || null, command.thumbnailUrl || null, command.userId, command.userId);
        if (muscleGroupRecord) {
            exercise.muscleGroupDetails = {
                id: muscleGroupRecord.id,
                name: muscleGroupRecord.name,
                imageUrl: muscleGroupRecord.imageUrl
            };
        }
        return this.exerciseRepository.create(exercise);
    }
};
exports.CreateExerciseUseCase = CreateExerciseUseCase;
exports.CreateExerciseUseCase = CreateExerciseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exercise_repository_1.IExerciseRepository)),
    __metadata("design:paramtypes", [Object])
], CreateExerciseUseCase);
//# sourceMappingURL=create-exercise.usecase.js.map