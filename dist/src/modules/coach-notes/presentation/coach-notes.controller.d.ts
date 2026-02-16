import { CoachNotesService } from '../application/coach-notes.service';
export declare class CoachNotesController {
    private readonly service;
    constructor(service: CoachNotesService);
    create(user: any, body: {
        clientId: string;
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        clientId: string;
        content: string;
    }>;
    findAll(clientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        clientId: string;
        content: string;
    }[]>;
    update(id: string, user: any, body: {
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
        clientId: string;
        content: string;
    }>;
    delete(id: string, user: any): Promise<void>;
}
