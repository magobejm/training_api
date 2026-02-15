import { PrismaService } from '../prisma/prisma.service';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        activePlan: {
            id: string;
            name: string;
        } | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        activePlan: {
            id: string;
            name: string;
            description: string | null;
        } | null;
    }>;
    updateProfile(user: any, body: {
        avatarUrl?: string;
    }): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
    }>;
    assignPlan(id: string, body: {
        planId: string | null;
    }): Promise<{
        id: string;
        activePlan: {
            id: string;
            name: string;
        } | null;
    }>;
    softDelete(id: string, req: any): Promise<{
        message: string;
    }>;
}
