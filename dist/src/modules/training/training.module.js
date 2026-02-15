"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingModule = void 0;
const common_1 = require("@nestjs/common");
const exercises_module_1 = require("../exercises/exercises.module");
const prisma_training_repository_1 = require("./infra/prisma-training.repository");
const training_repository_1 = require("./domain/training.repository");
const create_training_plan_usecase_1 = require("./application/create-training-plan.usecase");
const get_training_plan_usecase_1 = require("./application/get-training-plan.usecase");
const add_exercise_to_day_usecase_1 = require("./application/add-exercise-to-day.usecase");
const training_controller_1 = require("./presentation/training.controller");
const add_day_to_plan_usecase_1 = require("./application/add-day-to-plan.usecase");
const get_training_plans_usecase_1 = require("./application/get-training-plans.usecase");
const delete_training_plan_usecase_1 = require("./application/delete-training-plan.usecase");
let TrainingModule = class TrainingModule {
};
exports.TrainingModule = TrainingModule;
exports.TrainingModule = TrainingModule = __decorate([
    (0, common_1.Module)({
        imports: [exercises_module_1.ExercisesModule],
        controllers: [training_controller_1.TrainingController],
        providers: [
            create_training_plan_usecase_1.CreateTrainingPlanUseCase,
            get_training_plan_usecase_1.GetTrainingPlanUseCase,
            get_training_plans_usecase_1.GetTrainingPlansUseCase,
            add_day_to_plan_usecase_1.AddDayToPlanUseCase,
            add_day_to_plan_usecase_1.AddDayToPlanUseCase,
            add_exercise_to_day_usecase_1.AddExerciseToDayUseCase,
            delete_training_plan_usecase_1.DeleteTrainingPlanUseCase,
            {
                provide: training_repository_1.ITrainingRepository,
                useClass: prisma_training_repository_1.PrismaTrainingRepository,
            },
        ],
    })
], TrainingModule);
//# sourceMappingURL=training.module.js.map