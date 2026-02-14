export enum ConsultationStatus {
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED',
}

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class Message {
    constructor(
        public readonly id: string,
        public readonly consultationId: string,
        public readonly senderId: string,
        public readonly content: string,
        public readonly readAt: Date | null,
        public readonly createdAt: Date,
    ) { }

    static create(
        consultationId: string,
        senderId: string,
        content: string,
    ): Message {
        return new Message(
            crypto.randomUUID(),
            consultationId,
            senderId,
            content,
            null, // readAt - starts as null
            new Date(),
        );
    }
}

export class Consultation {
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly trainerId: string,
        public readonly subject: string,
        public readonly status: ConsultationStatus,
        public readonly priority: Priority,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly resolvedAt: Date | null,
        public readonly messages: Message[],
    ) { }

    static create(
        clientId: string,
        trainerId: string,
        subject: string,
        priority: Priority = Priority.MEDIUM,
    ): Consultation {
        return new Consultation(
            crypto.randomUUID(),
            clientId,
            trainerId,
            subject,
            ConsultationStatus.OPEN,
            priority,
            new Date(),
            new Date(),
            null,
            [],
        );
    }

    resolve(): Consultation {
        return new Consultation(
            this.id,
            this.clientId,
            this.trainerId,
            this.subject,
            ConsultationStatus.RESOLVED,
            this.priority,
            this.createdAt,
            new Date(),
            new Date(),
            this.messages,
        );
    }
}
