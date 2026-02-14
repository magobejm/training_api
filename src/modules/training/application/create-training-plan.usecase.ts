import { Inject, Injectable } from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

@Injectable()
export class CreateTrainingPlanUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
  ) {}

  async execute(command: {
    name: string;
    description?: string;
    authorId: string;
  }): Promise<TrainingPlan> {
    const plan = TrainingPlan.create(
      command.name,
      command.description || null,
      command.authorId,
    );
    return this.trainingRepository.createPlan(plan);
  }
}
