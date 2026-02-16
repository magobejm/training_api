"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachNotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let CoachNotesService = class CoachNotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(authorId, clientId, content) {
        return this.prisma.coachNote.create({
            data: {
                authorId,
                clientId,
                content,
            },
        });
    }
    async findAllByClient(clientId) {
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
    async update(id, authorId, content) {
        const note = await this.prisma.coachNote.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException('Note not found');
        }
        if (note.authorId !== authorId) {
            throw new common_1.ForbiddenException('You can only edit your own notes');
        }
        return this.prisma.coachNote.update({
            where: { id },
            data: { content },
        });
    }
    async delete(id, authorId) {
        const note = await this.prisma.coachNote.findUnique({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException('Note not found');
        }
        if (note.authorId !== authorId) {
            throw new common_1.ForbiddenException('You can only delete your own notes');
        }
        await this.prisma.coachNote.delete({ where: { id } });
    }
};
exports.CoachNotesService = CoachNotesService;
exports.CoachNotesService = CoachNotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoachNotesService);
//# sourceMappingURL=coach-notes.service.js.map