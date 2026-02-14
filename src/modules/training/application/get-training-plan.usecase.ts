import { Inject, Injectable } from '@nestjs/common';
import { ITrainingRepository } from '../domain/training.repository';
import { TrainingPlan } from '../domain/training-plan.entity';

@Injectable()
export class GetTrainingPlanUseCase {
  constructor(
    @Inject(ITrainingRepository)
    private readonly trainingRepository: ITrainingRepository,
  ) {}

  async execute(id: string): Promise<TrainingPlan | null> {
    return this.trainingRepository.getPlanById(id);
  }
}
