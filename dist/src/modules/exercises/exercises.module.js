"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const create_exercise_usecase_1 = require("./application/create-exercise.usecase");
const get_exercises_usecase_1 = require("./application/get-exercises.usecase");
const get_exercise_by_id_usecase_1 = require("./application/get-exercise-by-id.usecase");
const update_exercise_usecase_1 = require("./application/update-exercise.usecase");
const delete_exercise_usecase_1 = require("./application/delete-exercise.usecase");
const prisma_exercise_repository_1 = require("./infra/prisma-exercise.repository");
const exercises_controller_1 = require("./presentation/exercises.controller");
const exercise_repository_1 = require("./domain/exercise.repository");
let ExercisesModule = class ExercisesModule {
};
exports.ExercisesModule = ExercisesModule;
exports.ExercisesModule = ExercisesModule = __decorate([
    (0, common_1.Module)({
        controllers: [exercises_controller_1.ExercisesController],
        providers: [
            create_exercise_usecase_1.CreateExerciseUseCase,
            get_exercises_usecase_1.GetExercisesUseCase,
            get_exercise_by_id_usecase_1.GetExerciseByIdUseCase,
            update_exercise_usecase_1.UpdateExerciseUseCase,
            delete_exercise_usecase_1.DeleteExerciseUseCase,
            {
                provide: exercise_repository_1.IExerciseRepository,
                useClass: prisma_exercise_repository_1.PrismaExerciseRepository,
            },
        ],
        exports: [exercise_repository_1.IExerciseRepository],
    })
], ExercisesModule);
//# sourceMappingURL=exercises.module.js.map