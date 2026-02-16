import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RoleEnum } from './domain/role.enum';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any | null>;
    login(user: any): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            avatarUrl: any;
        };
    }>;
    register(registerDto: {
        email: string;
        password: string;
        name?: string;
        role: RoleEnum;
        avatarUrl?: string;
        phone?: string;
        goal?: string;
    }): Promise<{
        id: any;
        email: any;
        name: any;
        role: any;
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
