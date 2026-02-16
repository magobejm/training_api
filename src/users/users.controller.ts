import { Controller, Get, Delete, Patch, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../modules/auth/decorators/current-user.decorator';
import { Gender } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private prisma: PrismaService) { }

    @Get()
    async findAll() {
        const users = await this.prisma.user.findMany({
            where: {
                deletedAt: null, // Only active users
            },
            select: {
                id: true,
                email: true,
                // role: true, // Deprecated Enum
                userRole: { // New Relation
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
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // Map userRole to role
        return users.map(user => ({
            ...user,
            role: user.userRole,
            userRole: undefined,
        }));
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                // role: true,
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

        if (!user || user.deletedAt) {
            throw new NotFoundException('User not found');
        }

        return {
            ...user,
            role: user.userRole,
            userRole: undefined,
            completedWorkouts: user._count.workoutSessions,
            _count: undefined,
        };
    }

    @Patch('profile')
    async updateProfile(
        @CurrentUser() user: any,
        @Body() body: {
            avatarUrl?: string;
            name?: string;
            birthDate?: string;
            gender?: Gender;
            height?: number;
            weight?: number;
            maxHeartRate?: number;
            restingHeartRate?: number;
            leanMass?: number;
            phone?: string;
            goal?: string;
        },
    ) {
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

    @Patch(':id/plan')
    async assignPlan(
        @Param('id') id: string,
        @Body() body: { planId: string | null },
    ) {
        const { planId } = body;

        // Verify user exists
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        // Verify plan exists if not unassigning
        if (planId) {
            const plan = await this.prisma.trainingPlan.findUnique({ where: { id: planId } });
            if (!plan) throw new NotFoundException('Training plan not found');
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

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() body: {
            name?: string;
            avatarUrl?: string;
            birthDate?: string;
            gender?: Gender;
            height?: number;
            weight?: number;
            maxHeartRate?: number;
            restingHeartRate?: number;
            leanMass?: number;
            phone?: string;
            goal?: string;
        },
    ) {
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

    @Delete(':id')
    async softDelete(@Param('id') id: string, @Request() req: any) {
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
}
