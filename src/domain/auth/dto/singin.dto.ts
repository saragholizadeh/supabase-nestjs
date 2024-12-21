import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator"

export class SignInDto {
    @IsEmail()
    @IsNotEmpty({message: "Email feild can't be empty"})
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty({message: "Password feild can't be empty"})
    password: string
}