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
    async findAll(user) {
        const where = {
            deletedAt: null,
        };
        if (user.role === 'TRAINER') {
            where.trainerId = user.userId;
        }
        const users = await this.prisma.user.findMany({
            where,
            orderBy: {
                name: 'asc'
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
                phone: true,
                birthDate: true,
                goal: true,
                height: true,
                weight: true,
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        workoutSessions: {
                            where: {
                                status: 'COMPLETED',
                                completedAt: {
                                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                },
                            },
                        },
                    },
                },
            },
        });
        return users.map(user => ({
            ...user,
            role: user.userRole,
            userRole: undefined,
            completedSessionsCount: user._count?.workoutSessions || 0,
            _count: undefined,
        }));
    }
    async findOne(id, user) {
        const where = { id };
        if (user.role === 'TRAINER') {
            where.trainerId = user.userId;
        }
        const foundUser = await this.prisma.user.findFirst({
            where,
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
                phone: true,
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
                },
                _count: {
                    select: {
                        workoutSessions: {
                            where: { status: 'COMPLETED' }
                        }
                    }
                }
            },
        });
        if (!foundUser || foundUser.deletedAt) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            ...foundUser,
            role: foundUser.userRole,
            userRole: undefined,
            completedWorkouts: foundUser._count.workoutSessions,
            _count: undefined,
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
                phone: body.phone,
                goal: body.goal,
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
                phone: true,
                goal: true,
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
    async update(id, currentUser, body) {
        const where = { id };
        if (currentUser.role === 'TRAINER') {
            where.trainerId = currentUser.userId;
        }
        const result = await this.prisma.user.updateMany({
            where,
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
                phone: body.phone,
                goal: body.goal,
            },
        });
        if (result.count === 0) {
            throw new common_1.NotFoundException('User not found or access denied');
        }
        const updatedUser = await this.prisma.user.findUnique({
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
                avatarUrl: true,
                name: true,
                birthDate: true,
                gender: true,
                height: true,
                weight: true,
                maxHeartRate: true,
                restingHeartRate: true,
                leanMass: true,
                phone: true,
                goal: true,
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
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
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
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
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