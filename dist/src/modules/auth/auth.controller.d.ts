import { AuthService } from './auth.service';
import { RoleEnum } from '@prisma/client';
declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
    role: RoleEnum;
}
declare class LoginDto {
    email: string;
    password: string;
}
declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
declare class ForgotPasswordDto {
    email: string;
}
declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            avatarUrl: any;
        };
    }>;
    register(body: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        } | null;
    }>;
    changePassword(req: any, body: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<any>;
}
export {};
