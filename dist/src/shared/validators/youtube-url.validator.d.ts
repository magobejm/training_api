import { ValidatorConstraintInterface } from 'class-validator';
export declare class IsYoutubeUrl implements ValidatorConstraintInterface {
    validate(text: string): boolean;
    defaultMessage(): string;
}
