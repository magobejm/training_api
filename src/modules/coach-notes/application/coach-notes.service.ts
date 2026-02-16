import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CoachNote } from '@prisma/client';

@Injectable()
export class CoachNotesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(authorId: string, clientId: string, content: string): Promise<CoachNote> {
        return this.prisma.coachNote.create({
            data: {
                authorId,
                clientId,
                content,
            },
        });
    }

    async findAllByClient(clientId: string): Promise<CoachNote[]> {
        return this.prisma.coachNote.findMany({
            where: { clientId },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        userRole: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async update(id: string, authorId: string, content: string): Promise<CoachNote> {
        const note = await this.prisma.coachNote.findUnique({ where: { id } });

        if (!note) {
            throw new NotFoundException('Note not found');
        }

        if (note.authorId !== authorId) {
            // Optimally check if user is admin or original author, for now strictly author
            // Or if we want any trainer to edit any note? Requirement said "editarlas y eliminarlas". Usually author only or admin.
            throw new ForbiddenException('You can only edit your own notes');
        }

        return this.prisma.coachNote.update({
            where: { id },
            data: { content },
        });
    }

    async delete(id: string, authorId: string): Promise<void> {
        const note = await this.prisma.coachNote.findUnique({ where: { id } });

        if (!note) {
            throw new NotFoundException('Note not found');
        }

        if (note.authorId !== authorId) {
            throw new ForbiddenException('You can only delete your own notes');
        }

        await this.prisma.coachNote.delete({ where: { id } });
    }
}
