export declare enum ConsultationStatus {
    OPEN = "OPEN",
    RESOLVED = "RESOLVED"
}
export declare enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
export declare class Message {
    readonly id: string;
    readonly consultationId: string;
    readonly senderId: string;
    readonly content: string;
    readonly readAt: Date | null;
    readonly createdAt: Date;
    constructor(id: string, consultationId: string, senderId: string, content: string, readAt: Date | null, createdAt: Date);
    static create(consultationId: string, senderId: string, content: string): Message;
}
export declare class Consultation {
    readonly id: string;
    readonly clientId: string;
    readonly trainerId: string;
    readonly subject: string;
    readonly status: ConsultationStatus;
    readonly priority: Priority;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly resolvedAt: Date | null;
    readonly messages: Message[];
    constructor(id: string, clientId: string, trainerId: string, subject: string, status: ConsultationStatus, priority: Priority, createdAt: Date, updatedAt: Date, resolvedAt: Date | null, messages: Message[]);
    static create(clientId: string, trainerId: string, subject: string, priority?: Priority): Consultation;
    resolve(): Consultation;
}
