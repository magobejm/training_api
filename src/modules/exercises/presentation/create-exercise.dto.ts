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
  defaultVideoUrl?: string;

  @IsOptional()
  @IsUrl()
  defaultImageUrl?: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;
}
