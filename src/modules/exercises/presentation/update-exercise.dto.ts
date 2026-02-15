import { IsOptional, IsString, IsUrl, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class UpdateExerciseDto {
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
    description?: string;

    @IsOptional()
    @IsString()
    muscleGroup?: string;

    @IsOptional()
    @ValidateIf((o) => o.defaultVideoUrl !== '' && o.defaultVideoUrl !== null)
    @IsUrl({}, { message: 'El URL del video debe ser válido' })
    defaultVideoUrl?: string | null;

    @IsOptional()
    @ValidateIf((o) => o.defaultImageUrl !== '' && o.defaultImageUrl !== null)
    @IsUrl({}, { message: 'El URL de la imagen debe ser válido' })
    defaultImageUrl?: string | null;

    @IsOptional()
    @ValidateIf((o) => o.thumbnailUrl !== '' && o.thumbnailUrl !== null)
    @IsUrl({}, { message: 'El URL de la miniatura debe ser válido' })
    thumbnailUrl?: string | null;
}
