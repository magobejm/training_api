import { PrismaService } from '../../../prisma/prisma.service';
import { TrainerStats, ClientStats } from '../dto/dashboard-stats.dto';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTrainerStats(trainerId: string): Promise<TrainerStats>;
    getClientStats(clientId: string): Promise<ClientStats>;
}
