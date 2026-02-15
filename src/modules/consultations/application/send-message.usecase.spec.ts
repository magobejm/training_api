import { Test, TestingModule } from '@nestjs/testing';
import { SendMessageUseCase } from './send-message.usecase';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation, ConsultationStatus, Priority, Message } from '../domain/consultation.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockConsultationRepository = {
    findById: jest.fn(),
    addMessage: jest.fn(),
};

describe('SendMessageUseCase', () => {
    let service: SendMessageUseCase;
    let repository: IConsultationRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SendMessageUseCase,
                {
                    provide: IConsultationRepository,
                    useValue: mockConsultationRepository,
                },
            ],
        }).compile();

        service = module.get<SendMessageUseCase>(SendMessageUseCase);
        repository = module.get<IConsultationRepository>(IConsultationRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send a message successfully', async () => {
        const consultation = new Consultation(
            'cons-id', 'client1', 'trainer1', 'Subject', ConsultationStatus.OPEN, Priority.MEDIUM, new Date(), new Date(), null, []
        );
        mockConsultationRepository.findById.mockResolvedValue(consultation);

        const expectedMessage = new Message('msg-id', 'cons-id', 'client1', 'Hello', null, new Date());
        mockConsultationRepository.addMessage.mockResolvedValue(expectedMessage);

        const command = {
            consultationId: 'cons-id',
            senderId: 'client1',
            content: 'Hello',
        };

        const result = await service.execute(command);

        expect(result).toEqual(expectedMessage);
        expect(mockConsultationRepository.addMessage).toHaveBeenCalled();
    });

    it('should throw ForbiddenException if sender is not part of consultation', async () => {
        const consultation = new Consultation(
            'cons-id', 'client1', 'trainer1', 'Subject', ConsultationStatus.OPEN, Priority.MEDIUM, new Date(), new Date(), null, []
        );
        mockConsultationRepository.findById.mockResolvedValue(consultation);

        const command = {
            consultationId: 'cons-id',
            senderId: 'other-user',
            content: 'Hello',
        };

        await expect(service.execute(command)).rejects.toThrow(ForbiddenException);
    });
});
