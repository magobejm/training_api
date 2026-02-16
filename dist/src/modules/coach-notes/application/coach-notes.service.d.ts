import { PrismaService } from '../../../prisma/prisma.service';
import { CoachNote } from '@prisma/client';
export declare class CoachNotesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(authorId: string, clientId: string, content: string): Promise<CoachNote>;
    findAllByClient(clientId: string): Promise<CoachNote[]>;
    update(id: string, authorId: string, content: string): Promise<CoachNote>;
    delete(id: string, authorId: string): Promise<void>;
}
