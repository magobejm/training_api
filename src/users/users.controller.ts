import { Controller, Get, Delete, Patch, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../modules/auth/decorators/current-user.decorator';

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
                role: true,
                createdAt: true,
                updatedAt: true,
                activePlan: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return users;
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
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
            throw new NotFoundException('User not found');
        }

        return user;
    }

    @Patch('profile')
    async updateProfile(
        @CurrentUser() user: any,
        @Body() body: { avatarUrl?: string },
    ) {
        return this.prisma.user.update({
            where: { id: user.userId },
            data: {
                avatarUrl: body.avatarUrl,
            },
            select: {
                id: true,
                email: true,
                role: true,
                avatarUrl: true,
            },
        });
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
