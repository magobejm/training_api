import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { RoleEnum } from './domain/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { userRole: true }
    });
    if (user && !user.deletedAt && user.password && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.userRole?.name || user.role };
    const { password, userRole, ...userWithoutPassword } = user;

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        role: userWithoutPassword.userRole || { name: userWithoutPassword.role },
        avatarUrl: userWithoutPassword.avatarUrl,
      },
    };
  }

  async register(registerDto: { email: string; password: string; name?: string; role: RoleEnum; avatarUrl?: string, phone?: string, goal?: string }) {
    const { email, password, name, role, avatarUrl, phone, goal } = registerDto;
    // Check if user exists (including soft-deleted)
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user exists and is NOT soft-deleted, throw Conflict
    if (existingUser && !existingUser.deletedAt) {
      throw new ConflictException('Email already in use');
    }

    // If user was soft-deleted, reactivate them
    if (existingUser && existingUser.deletedAt) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const reactivatedUser = await this.prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: name || existingUser.name, // Keep existing name if not provided
          avatarUrl: avatarUrl || existingUser.avatarUrl,
          phone: phone || existingUser.phone,
          goal: goal || existingUser.goal,
          deletedAt: null,
          deletedBy: null,
          updatedAt: new Date(),
          // role: role, // Removed legacy column update, reliance on relation handled below if we wanted to change role?
          // For now assuming role doesn't change on reactivation unless specified.
        },
        include: { userRole: true }
      }) as any;

      return {
        id: reactivatedUser.id,
        email: reactivatedUser.email,
        name: reactivatedUser.name,
        role: reactivatedUser.userRole || { name: role || RoleEnum.CLIENT },
      };
    }

    // Normal registration for new users
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await this.prisma.role.findUnique({
      where: { name: role || RoleEnum.CLIENT }
    });

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0], // Default name
        avatarUrl,
        phone,
        goal,
        roleId: userRole?.id as string,
      } as any,
      include: { userRole: true }
    }) as any;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.userRole || { name: role || RoleEnum.CLIENT },
    };
  }

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(oldPass, user.password);
    if (!isMatch) {
      throw new Error('Invalid current password');
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Return success even if user not found to prevent enumeration
      return { message: 'If email exists, reset instructions sent.' };
    }

    // Generate simple token (for prod use crypto)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // In a real app, send email here.
    // For now, log it so we can test.
    console.log(`[RESET PASSWORD] Token for ${email}: ${resetToken}`);

    return { message: 'If email exists, reset instructions sent.' };
  }

  async resetPassword(token: string, newPass: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return { message: 'Password reset successfully' };
  }
}
