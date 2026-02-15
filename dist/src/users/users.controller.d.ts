import { PrismaService } from '../prisma/prisma.service';
import { Gender } from '@prisma/client';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        role: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        userRole: undefined;
        id: string;
        email: string;
        name: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        activePlan: {
            id: string;
            name: string;
        } | null;
    }[]>;
    findOne(id: string): Promise<{
        role: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        userRole: undefined;
        id: string;
        email: string;
        name: string | null;
        avatarUrl: string | null;
        birthDate: Date | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        height: number | null;
        weight: number | null;
        maxHeartRate: number | null;
        restingHeartRate: number | null;
        leanMass: number | null;
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
        name?: string;
        birthDate?: string;
        gender?: Gender;
        height?: number;
        weight?: number;
        maxHeartRate?: number;
        restingHeartRate?: number;
        leanMass?: number;
    }): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleEnum;
        name: string | null;
        avatarUrl: string | null;
        birthDate: Date | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        height: number | null;
        weight: number | null;
        maxHeartRate: number | null;
        restingHeartRate: number | null;
        leanMass: number | null;
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
    update(id: string, body: {
        name?: string;
        birthDate?: string;
        gender?: Gender;
        height?: number;
        weight?: number;
        maxHeartRate?: number;
        restingHeartRate?: number;
        leanMass?: number;
    }): Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleEnum;
        name: string | null;
        avatarUrl: string | null;
        birthDate: Date | null;
        gender: import("@prisma/client").$Enums.Gender | null;
        height: number | null;
        weight: number | null;
        maxHeartRate: number | null;
        restingHeartRate: number | null;
        leanMass: number | null;
    }>;
    softDelete(id: string, req: any): Promise<{
        message: string;
    }>;
}
