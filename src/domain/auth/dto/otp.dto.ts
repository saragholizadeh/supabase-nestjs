import { IsInt, IsNotEmpty, IsNumber, Length, Max, Min } from "class-validator";
import { SignInDto } from "./singin.dto";

export class OtpDto extends SignInDto {
    @IsNumber()
    @IsInt()
    @Length(6,6)
    @IsNotEmpty()
    code: number
}