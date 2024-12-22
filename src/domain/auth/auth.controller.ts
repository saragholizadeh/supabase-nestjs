import { Controller, Post, Body, Param, Get, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpDto, RefreshTokenDto, SignInDto } from './dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return {
      data: await this.authService.signIn(body)
    }
  }

  @Post('verify')
  async verifyOtp(
    @Body() otpDto: OtpDto
  ){
    return {
      data: await this.authService.verifyOtp(otpDto)
    }
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const tokens = await this.authService.refreshAccessToken(refreshTokenDto);
    return tokens;
  }
}
