import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEnum } from '../auth/domain/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async createTrainer(email: string, password: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            if (existingUser.deletedAt) {
                // Reactivate logic could go here, or just throw error saying email taken
                throw new BadRequestException('Email already exists (and might be soft-deleted).');
            }
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Fetch Role ID for TRAINER
        const roleRecord = await this.prisma.role.findUnique({ where: { name: 'TRAINER' } });

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                roleId: roleRecord?.id as string,
            } as any,
        });

        const { password: _, ...result } = user;
        return result;
    }

    async getAllTrainers() {
        return this.prisma.user.findMany({
            where: {
                userRole: { name: 'TRAINER' },
                deletedAt: null,
            },
            select: {
                id: true,
                email: true,
                userRole: { select: { name: true } },
                createdAt: true,
                // Don't select password
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async deleteTrainer(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { userRole: true }
        });
        if (!user || (user as any).userRole?.name !== 'TRAINER') {
            throw new NotFoundException('Trainer not found');
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deletedBy: 'ADMIN', // Could be dynamic if we pass admin ID
            },
        });
    }

    async resetTrainerPassword(id: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { userRole: true }
        });
        if (!user || (user as any).userRole?.name !== 'TRAINER') {
            throw new NotFoundException('Trainer not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: { id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpires: null,
            }
        });

        return { message: 'Password reset successfully' };
    }
}
