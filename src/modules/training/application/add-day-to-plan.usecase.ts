import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingDay } from '../domain/training-day.entity';

@Injectable()
export class AddDayToPlanUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
  ) {}

  async execute(command: {
    planId: string;
    name: string;
    order: number;
    userId: string;
  }): Promise<TrainingDay> {
    const plan = await this.trainingRepository.getPlanById(command.planId);
    if (!plan) {
      throw new NotFoundException(
        `Training Plan with ID ${command.planId} not found`,
      );
    }

    if (plan.authorId !== command.userId) {
      throw new ForbiddenException('You are not allowed to modify this plan');
    }

    const day = new TrainingDay(
      crypto.randomUUID(),
      command.name,
      command.order,
      command.planId,
      [],
      new Date(),
      new Date(),
    );

    return this.trainingRepository.createDay(day);
  }
}
