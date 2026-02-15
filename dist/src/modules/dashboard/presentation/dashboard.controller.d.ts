import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
import { DashboardService } from '../application/dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(user: AuthenticatedUser): Promise<{
        role: any;
        data: import("../dto/dashboard-stats.dto").TrainerStats;
    } | {
        role: any;
        data: import("../dto/dashboard-stats.dto").ClientStats;
    }>;
}
