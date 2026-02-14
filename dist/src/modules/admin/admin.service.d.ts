import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createTrainer(email: string, password: string): Promise<{
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
    resetTrainerPassword(id: string, newPassword: string): Promise<{
        message: string;
    }>;
}
