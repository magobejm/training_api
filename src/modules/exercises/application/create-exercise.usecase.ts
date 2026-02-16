import { Inject, Injectable } from '@nestjs/common';
import { Exercise } from '../domain/exercise.entity';
import { IExerciseRepository } from '../domain/exercise.repository';

@Injectable()
export class CreateExerciseUseCase {
  constructor(
    @Inject(IExerciseRepository)
    private readonly exerciseRepository: IExerciseRepository,
  ) { }

  async execute(command: {
    name: string;
    description: string;
    muscleGroup: string;
    videoUrl?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    userId: string;
  }): Promise<Exercise> {
    // Resolve muscleGroupId from name
    const muscleGroups = await this.exerciseRepository.findAllMuscleGroups();
    const muscleGroupRecord = muscleGroups.find(mg => mg.name === command.muscleGroup);

    const exercise = Exercise.create(
      command.name,
      command.description,
      command.muscleGroup,
      command.videoUrl || null,
      command.imageUrl || null,
      command.thumbnailUrl || null,
      command.userId,
      command.userId, // Pass userId as trainerId
    );

    // If found, we could add it to the entity, but currently the entity logic/factory might need update or
    // we set it in the repository if we pass it.
    // However, the Domain Entity `Exercise` has `muscleGroupDetails` which is read-only usually.
    // The Repository's `create` method reads `muscleGroupDetails?.id`.
    // So we need to ensure the Entity has the details or we pass it correctly.

    // Let's attach it to the entity so the repository can see it
    if (muscleGroupRecord) {
      // We need a way to set this on the domain entity. 
      // Ideally checking Exercise.create signature.
      // The current Exercise.create sets muscleGroupDetails to undefined.
      // We can cast or add a setter, or update the factory.
      // For now, let's update the factory call if possible, or hack it via Object.assign for this refactor 
      // if we don't want to change the domain model signature right now.
      // Better approach: Update Exercise.create to accept optional muscleGroupId or details.

      // Actually, let's just cheat slightly for the refactor to avoid changing Domain signature in a breaking way
      // and assign it.
      (exercise as any).muscleGroupDetails = {
        id: muscleGroupRecord.id,
        name: muscleGroupRecord.name,
        imageUrl: muscleGroupRecord.imageUrl
      };
    }

    return this.exerciseRepository.create(exercise);
  }
}
