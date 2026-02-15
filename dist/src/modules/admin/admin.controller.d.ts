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
        resetToken: string | null;
        role: import("@prisma/client").$Enums.RoleEnum;
        roleId: string | null;
        organizationId: string | null;
        name: string | null;
        avatarUrl: string | null;
        birthDate: Date | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        height: number | null;
        weight: number | null;
        maxHeartRate: number | null;
        restingHeartRate: number | null;
        leanMass: number | null;
        activePlanId: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        deletedAt: Date | null;
        deletedBy: string | null;
        resetTokenExpires: Date | null;
        trainingPlanId: string | null;
    }>;
    getAllTrainers(): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleEnum;
        createdAt: Date;
    }[]>;
    deleteTrainer(id: string): Promise<{
        id: string;
        email: string;
        resetToken: string | null;
        password: string | null;
        role: import("@prisma/client").$Enums.RoleEnum;
        roleId: string | null;
        organizationId: string | null;
        name: string | null;
        avatarUrl: string | null;
        birthDate: Date | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        height: number | null;
        weight: number | null;
        maxHeartRate: number | null;
        restingHeartRate: number | null;
        leanMass: number | null;
        activePlanId: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        deletedAt: Date | null;
        deletedBy: string | null;
        resetTokenExpires: Date | null;
        trainingPlanId: string | null;
    }>;
    resetTrainerPassword(id: string, body: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
export {};
