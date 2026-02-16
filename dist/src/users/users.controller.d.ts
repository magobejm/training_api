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
        };
        userRole: undefined;
        id: string;
        email: string;
        name: string | null;
        avatarUrl: string | null;
        phone: string | null;
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
        };
        userRole: undefined;
        completedWorkouts: number;
        _count: undefined;
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
        phone: string | null;
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
        phone?: string;
        goal?: string;
    }): Promise<{
        role: {
            id: string;
            name: string;
            description: string | null;
        };
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
        phone: string | null;
        goal: string | null;
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
        avatarUrl?: string;
        birthDate?: string;
        gender?: Gender;
        height?: number;
        weight?: number;
        maxHeartRate?: number;
        restingHeartRate?: number;
        leanMass?: number;
        phone?: string;
        goal?: string;
    }): Promise<{
        role: {
            id: string;
            name: string;
            description: string | null;
        };
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
        phone: string | null;
        goal: string | null;
    }>;
    softDelete(id: string, req: any): Promise<{
        message: string;
    }>;
}
