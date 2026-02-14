import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
declare class RegisterDto {
    email: string;
    password: string;
    role: Role;
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
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    register(body: RegisterDto): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
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
