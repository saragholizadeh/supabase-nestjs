import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator"

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}