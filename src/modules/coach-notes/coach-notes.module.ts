import { Module } from '@nestjs/common';
import { CoachNotesService } from './application/coach-notes.service';
import { CoachNotesController } from './presentation/coach-notes.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    controllers: [CoachNotesController],
    providers: [CoachNotesService, PrismaService],
})
export class CoachNotesModule { }
