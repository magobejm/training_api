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
exports.DeleteTrainingPlanUseCase = void 0;
const common_1 = require("@nestjs/common");
const training_repository_1 = require("../domain/training.repository");
let DeleteTrainingPlanUseCase = class DeleteTrainingPlanUseCase {
    trainingRepository;
    constructor(trainingRepository) {
        this.trainingRepository = trainingRepository;
    }
    async execute(input) {
        const { id, userId } = input;
        const plan = await this.trainingRepository.getPlanById(id);
        if (!plan) {
            throw new common_1.NotFoundException(`Plan de entrenamiento con ID ${id} no encontrado`);
        }
        if (plan.authorId !== userId) {
            throw new common_1.ForbiddenException('No tienes permiso para eliminar este plan');
        }
        const hasDependencies = await this.trainingRepository.hasScheduledWorkouts(id);
        if (hasDependencies) {
            throw new common_1.BadRequestException('No se puede eliminar el plan porque tiene sesiones programadas para clientes.');
        }
        const hasActiveUsers = await this.trainingRepository.hasActiveUsers(id);
        if (hasActiveUsers) {
            throw new common_1.BadRequestException('No se puede eliminar el plan porque está asignado actualmente a clientes activos.');
        }
        await this.trainingRepository.deletePlan(id);
    }
};
exports.DeleteTrainingPlanUseCase = DeleteTrainingPlanUseCase;
exports.DeleteTrainingPlanUseCase = DeleteTrainingPlanUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(training_repository_1.ITrainingRepository)),
    __metadata("design:paramtypes", [Object])
], DeleteTrainingPlanUseCase);
//# sourceMappingURL=delete-training-plan.usecase.js.map