import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpDto, RefreshTokenDto, SignInDto } from './dto';
import { SupabaseService } from 'src/common';
import { VerificationTransform } from './transform';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async signIn(signInDto: SignInDto): Promise<void> {
    const { email } = signInDto;
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase.auth.signInWithOtp({email});
    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async verifyOtp(otpDto: OtpDto): Promise<Object>{
    const { code, email } = otpDto;
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: `${code}`,
      type: 'email', 
    });

    if (error) {
      throw new UnauthorizedException('Invalid Otp');
    }
    const session = data.session;
    const user = data.user;

    return {
      message: 'OTP verified successfully.',
      ...new VerificationTransform().transform({user, session}),
    }
  }

  async refreshAccessToken(refreshTokenDto: RefreshTokenDto) {
    const { data, error } = await this.supabaseService.getClient().auth.refreshSession({
      refresh_token: refreshTokenDto.refreshToken
    });

    if (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return data;
  }
}
