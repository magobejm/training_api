"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationsModule = void 0;
const common_1 = require("@nestjs/common");
const consultations_controller_1 = require("./presentation/consultations.controller");
const create_consultation_usecase_1 = require("./application/create-consultation.usecase");
const send_message_usecase_1 = require("./application/send-message.usecase");
const get_consultations_usecase_1 = require("./application/get-consultations.usecase");
const get_consultation_by_id_usecase_1 = require("./application/get-consultation-by-id.usecase");
const mark_consultation_as_resolved_usecase_1 = require("./application/mark-consultation-as-resolved.usecase");
const prisma_consultation_repository_1 = require("./infra/prisma-consultation.repository");
const consultation_repository_1 = require("./domain/consultation.repository");
let ConsultationsModule = class ConsultationsModule {
};
exports.ConsultationsModule = ConsultationsModule;
exports.ConsultationsModule = ConsultationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [consultations_controller_1.ConsultationsController],
        providers: [
            create_consultation_usecase_1.CreateConsultationUseCase,
            send_message_usecase_1.SendMessageUseCase,
            get_consultations_usecase_1.GetConsultationsUseCase,
            get_consultation_by_id_usecase_1.GetConsultationByIdUseCase,
            mark_consultation_as_resolved_usecase_1.MarkConsultationAsResolvedUseCase,
            {
                provide: consultation_repository_1.IConsultationRepository,
                useClass: prisma_consultation_repository_1.PrismaConsultationRepository,
            },
        ],
        exports: [consultation_repository_1.IConsultationRepository],
    })
], ConsultationsModule);
//# sourceMappingURL=consultations.module.js.map