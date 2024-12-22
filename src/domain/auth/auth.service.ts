import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/services';
import { IAuth } from './interfaces';
import { OtpDto, RefreshTokenDto, SignInDto } from './dto';

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
      success: true,
      message: 'OTP verified successfully.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          emailConfirmed: user.email_confirmed_at,
          role: user.role,
        },
        session: {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          expiresAt: session.expires_at,
        },
      },
    };
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
