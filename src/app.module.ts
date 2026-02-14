import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TrainingModule } from './modules/training/training.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { BodyMetricsModule } from './modules/body-metrics/body-metrics.module';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ExercisesModule,
    TrainingModule,
    SessionsModule,
    BodyMetricsModule,
    ConsultationsModule,
    SchedulingModule,
    UsersModule,
    AdminModule,
  ],
})
export class AppModule { }
