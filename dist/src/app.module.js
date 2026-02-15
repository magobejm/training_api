"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const exercises_module_1 = require("./modules/exercises/exercises.module");
const training_module_1 = require("./modules/training/training.module");
const sessions_module_1 = require("./modules/sessions/sessions.module");
const body_metrics_module_1 = require("./modules/body-metrics/body-metrics.module");
const consultations_module_1 = require("./modules/consultations/consultations.module");
const scheduling_module_1 = require("./modules/scheduling/scheduling.module");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const admin_module_1 = require("./modules/admin/admin.module");
const health_module_1 = require("./modules/health/health.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            exercises_module_1.ExercisesModule,
            training_module_1.TrainingModule,
            sessions_module_1.SessionsModule,
            body_metrics_module_1.BodyMetricsModule,
            consultations_module_1.ConsultationsModule,
            scheduling_module_1.SchedulingModule,
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
            health_module_1.HealthModule,
            dashboard_module_1.DashboardModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map