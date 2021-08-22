import { IsEmail, IsString, IsNotEmpty, MaxLength, IsEmpty } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string;

    @IsEmpty()
    created_at: string;
    @IsEmpty()
    updated_at: string;
}
