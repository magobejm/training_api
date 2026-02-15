import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && !user.deletedAt && user.password && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const { password, ...userWithoutPassword } = user;

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        role: userWithoutPassword.role,
        avatarUrl: userWithoutPassword.avatarUrl,
      },
    };
  }

  async register(registerDto: { email: string; password: string; name?: string; role: Role }) {
    const { email, password, name, role } = registerDto;
    // Check if user exists (including soft-deleted)
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user was soft-deleted, reactivate them
    if (existingUser && existingUser.deletedAt) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const reactivatedUser = await this.prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: name || existingUser.name, // Keep existing name if not provided
          deletedAt: null,
          deletedBy: null,
          updatedAt: new Date(),
        },
      });

      return {
        id: reactivatedUser.id,
        email: reactivatedUser.email,
        name: reactivatedUser.name,
        role: reactivatedUser.role,
      };
    }

    // Normal registration for new users
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0], // Default name
        role: role || Role.CLIENT,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
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
