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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_auth_guard_1 = require("../modules/auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../modules/auth/decorators/current-user.decorator");
let UsersController = class UsersController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                id: true,
                email: true,
                userRole: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
                name: true,
                avatarUrl: true,
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return users.map(user => ({
            ...user,
            role: user.userRole,
            userRole: undefined,
        }));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                userRole: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                name: true,
                avatarUrl: true,
                birthDate: true,
                gender: true,
                height: true,
                weight: true,
                maxHeartRate: true,
                restingHeartRate: true,
                leanMass: true,
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            },
        });
        if (!user || user.deletedAt) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            ...user,
            role: user.userRole,
            userRole: undefined,
        };
    }
    async updateProfile(user, body) {
        const result = await this.prisma.user.update({
            where: { id: user.userId },
            data: {
                avatarUrl: body.avatarUrl,
                name: body.name,
                birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
                gender: body.gender,
                height: body.height,
                weight: body.weight,
                maxHeartRate: body.maxHeartRate,
                restingHeartRate: body.restingHeartRate,
                leanMass: body.leanMass,
            },
            select: {
                id: true,
                email: true,
                userRole: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                avatarUrl: true,
                name: true,
                birthDate: true,
                gender: true,
                height: true,
                weight: true,
                maxHeartRate: true,
                restingHeartRate: true,
                leanMass: true,
            },
        });
        return {
            ...result,
            role: result.userRole,
            userRole: undefined,
        };
    }
    async assignPlan(id, body) {
        const { planId } = body;
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (planId) {
            const plan = await this.prisma.trainingPlan.findUnique({ where: { id: planId } });
            if (!plan)
                throw new common_1.NotFoundException('Training plan not found');
        }
        return this.prisma.user.update({
            where: { id },
            data: { activePlanId: planId },
            select: {
                id: true,
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    }
    async update(id, body) {
        const result = await this.prisma.user.update({
            where: { id },
            data: {
                name: body.name,
                avatarUrl: body.avatarUrl,
                birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
                gender: body.gender,
                height: body.height,
                weight: body.weight,
                maxHeartRate: body.maxHeartRate,
                restingHeartRate: body.restingHeartRate,
                leanMass: body.leanMass,
            },
            select: {
                id: true,
                email: true,
                userRole: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                },
                avatarUrl: true,
                name: true,
                birthDate: true,
                gender: true,
                height: true,
                weight: true,
                maxHeartRate: true,
                restingHeartRate: true,
                leanMass: true,
            },
        });
        return {
            ...result,
            role: result.userRole,
            userRole: undefined,
        };
    }
    async softDelete(id, req) {
        const userId = req.user.userId;
        await this.prisma.user.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedBy: userId,
            },
        });
        return { message: 'User deleted successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)(':id/plan'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "assignPlan", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "softDelete", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersController);
//# sourceMappingURL=users.controller.js.map