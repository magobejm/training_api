import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Role } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: User): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
        };
    }>;
    register(registerDto: {
        email: string;
        password: string;
        name?: string;
        role: Role;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
    }>;
    changePassword(userId: string, oldPass: string, newPass: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPass: string): Promise<{
        message: string;
    }>;
}
