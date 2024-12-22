import { Controller, Post, Body, Param, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpDto, RefreshTokenDto, SignInDto } from './dto';
import { JwtAuthGuard } from 'src/common';
import { GetUser } from 'src/common/decorators';
import { User } from '@supabase/supabase-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return {
      data: await this.authService.signIn(body)
    }
  }

  @Post('verify')
  async verifyOtp(
    @Body() otpDto: OtpDto
  ) {
    return {
      data: await this.authService.verifyOtp(otpDto)
    }
  }

  @Post('refreshToken')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return { data: await this.authService.refreshAccessToken(refreshTokenDto) }
  }
}
