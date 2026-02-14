import { AdminService } from './admin.service';
declare class CreateTrainerDto {
    email: string;
    password: string;
}
declare class ResetPasswordDto {
    newPassword: string;
}
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    createTrainer(body: CreateTrainerDto): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        deletedAt: Date | null;
        deletedBy: string | null;
        resetToken: string | null;
        resetTokenExpires: Date | null;
        organizationId: string | null;
    }>;
    getAllTrainers(): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    deleteTrainer(id: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        deletedAt: Date | null;
        deletedBy: string | null;
        resetToken: string | null;
        resetTokenExpires: Date | null;
        organizationId: string | null;
    }>;
    resetTrainerPassword(id: string, body: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
export {};
