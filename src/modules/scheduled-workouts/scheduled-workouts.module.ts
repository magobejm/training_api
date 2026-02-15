import { Module } from '@nestjs/common';
import { ScheduledWorkoutsController } from './presentation/scheduled-workouts.controller';
import { ScheduledWorkoutsService } from './application/scheduled-workouts.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ScheduledWorkoutsController],
    providers: [ScheduledWorkoutsService],
})
export class ScheduledWorkoutsModule { }
