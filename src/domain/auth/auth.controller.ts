import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body: SignInDto) {
    return this.authService.signUp(body);
  }

  @Get('confirm')
  async confirmEmail(
    @Param() accessToken : any
  ){
    console.log(accessToken);
  }
}
