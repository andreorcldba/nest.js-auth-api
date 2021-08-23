import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class TokenDto {

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    old_token: string;
} 