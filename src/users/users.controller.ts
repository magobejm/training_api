import { Controller, Get, Delete, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';

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
            },
        });

        if (!user || user.deletedAt) {
            throw new NotFoundException('User not found');
        }

        return user;
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
