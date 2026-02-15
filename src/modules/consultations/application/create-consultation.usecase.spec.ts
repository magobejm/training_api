import { Test, TestingModule } from '@nestjs/testing';
import { CreateConsultationUseCase } from './create-consultation.usecase';
import { IConsultationRepository } from '../domain/consultation.repository';
import { Consultation, ConsultationStatus, Priority } from '../domain/consultation.entity';

const mockConsultationRepository = {
    createConsultation: jest.fn(),
};

describe('CreateConsultationUseCase', () => {
    let service: CreateConsultationUseCase;
    let repository: IConsultationRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateConsultationUseCase,
                {
                    provide: IConsultationRepository,
                    useValue: mockConsultationRepository,
                },
            ],
        }).compile();

        service = module.get<CreateConsultationUseCase>(CreateConsultationUseCase);
        repository = module.get<IConsultationRepository>(IConsultationRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a consultation successfully', async () => {
        const command = {
            clientId: 'client1',
            trainerId: 'trainer1',
            subject: 'Help needed',
            priority: Priority.HIGH,
            initialMessage: 'I need help with my diet',
        };

        const expectedConsultation = Consultation.create(
            command.clientId,
            command.trainerId,
            command.subject,
            command.priority
        );
        // Mocking internally creating the consultation, we just verifying it calls repository
        mockConsultationRepository.createConsultation.mockResolvedValue(expectedConsultation);

        const result = await service.execute(command);

        // Since we can't easily spy on the exact object created inside execute (it uses new Consultation),
        // we verify the repository is called with an object matching the properties.
        expect(mockConsultationRepository.createConsultation).toHaveBeenCalledWith(
            expect.objectContaining({
                clientId: command.clientId,
                trainerId: command.trainerId,
                subject: command.subject,
                priority: command.priority
            })
        );
    });
});
