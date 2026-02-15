import { IsString, IsOptional, IsUrl, ValidateIf } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  muscleGroup: string;

  @IsOptional()
  @ValidateIf((o) => o.defaultVideoUrl !== '' && o.defaultVideoUrl !== null)
  @IsUrl()
  defaultVideoUrl?: string | null;

  @IsOptional()
  @ValidateIf((o) => o.defaultImageUrl !== '' && o.defaultImageUrl !== null)
  @IsUrl()
  defaultImageUrl?: string | null;

  @IsOptional()
  @ValidateIf((o) => o.thumbnailUrl !== '' && o.thumbnailUrl !== null)
  @IsUrl()
  thumbnailUrl?: string | null;
}
