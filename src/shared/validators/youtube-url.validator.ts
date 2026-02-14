import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isYoutubeUrl', async: false })
export class IsYoutubeUrl implements ValidatorConstraintInterface {
  validate(text: string) {
    if (!text) return false;
    // Regex simple for YouTube (Standard and Short)
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    return regex.test(text);
  }

  defaultMessage() {
    return 'URL ($value) must be a valid YouTube URL';
  }
}
