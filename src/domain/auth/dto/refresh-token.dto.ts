import { IsNotEmpty, IsString, Length } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @Length(20, 40)
    @IsNotEmpty()
    refreshToken: string
}