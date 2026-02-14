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
exports.AddDayToPlanUseCase = void 0;
const common_1 = require("@nestjs/common");
const training_repository_1 = require("../domain/training.repository");
const training_day_entity_1 = require("../domain/training-day.entity");
let AddDayToPlanUseCase = class AddDayToPlanUseCase {
    trainingRepository;
    constructor(trainingRepository) {
        this.trainingRepository = trainingRepository;
    }
    async execute(command) {
        const plan = await this.trainingRepository.getPlanById(command.planId);
        if (!plan) {
            throw new common_1.NotFoundException(`Training Plan with ID ${command.planId} not found`);
        }
        if (plan.authorId !== command.userId) {
            throw new common_1.ForbiddenException('You are not allowed to modify this plan');
        }
        const day = new training_day_entity_1.TrainingDay(crypto.randomUUID(), command.name, command.order, command.planId, [], new Date(), new Date());
        return this.trainingRepository.createDay(day);
    }
};
exports.AddDayToPlanUseCase = AddDayToPlanUseCase;
exports.AddDayToPlanUseCase = AddDayToPlanUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(training_repository_1.ITrainingRepository)),
    __metadata("design:paramtypes", [Object])
], AddDayToPlanUseCase);
//# sourceMappingURL=add-day-to-plan.usecase.js.map