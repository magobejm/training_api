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
    async findAll(@CurrentUser() user: any) {
        const where: any = {
            deletedAt: null,
        };

        // Privacy: Trainers only see their own clients
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

        // Map userRole to role and flatten _count
        return users.map(user => ({
            ...user,
            role: user.userRole,
            userRole: undefined,
            completedSessionsCount: user._count?.workoutSessions || 0,
            _count: undefined,
        }));
    }


    @Get(':id')
    async findOne(@Param('id') id: string, @CurrentUser() user: any) {
        const where: any = { id };

        // Privacy
        if (user.role === 'TRAINER') {
            where.trainerId = user.userId;
        }

        const foundUser = await this.prisma.user.findFirst({
            where,
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

        if (!foundUser || foundUser.deletedAt) {
            throw new NotFoundException('User not found');
        }

        return {
            ...foundUser,
            role: foundUser.userRole,
            userRole: undefined,
            completedWorkouts: foundUser._count.workoutSessions,
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
        @CurrentUser() currentUser: any,
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
        const where: any = { id };
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
            throw new NotFoundException('User not found or access denied');
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
