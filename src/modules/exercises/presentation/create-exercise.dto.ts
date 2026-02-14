import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  muscleGroup: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;
}
