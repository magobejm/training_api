import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../auth/domain/jwt-payload.interface';
import { DashboardService } from '../application/dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('stats')
    async getStats(@CurrentUser() user: AuthenticatedUser) {
        const userRole = await this.prisma.role.findUnique({
            where: { name: user.role }
        });

        if (user.role === 'TRAINER') {
            const data = await this.dashboardService.getTrainerStats(user.userId);
            return { role: userRole, data };
        } else {
            const data = await this.dashboardService.getClientStats(user.userId);
            return { role: userRole, data };
        }
    }
}
