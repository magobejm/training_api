import { Inject, Injectable } from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

@Injectable()
export class GetTrainingPlansUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
  ) {}

  async execute(authorId?: string): Promise<TrainingPlan[]> {
    return this.trainingRepository.findAll(authorId);
  }
}
