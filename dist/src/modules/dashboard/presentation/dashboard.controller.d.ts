import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
import { DashboardService } from '../application/dashboard.service';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class DashboardController {
    private readonly dashboardService;
    private readonly prisma;
    constructor(dashboardService: DashboardService, prisma: PrismaService);
    getStats(user: AuthenticatedUser): Promise<{
        role: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        data: import("../dto/dashboard-stats.dto").TrainerStats;
    } | {
        role: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        data: import("../dto/dashboard-stats.dto").ClientStats;
    }>;
}
