import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/services';
import { IAuth } from './interfaces';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return data;
  }

  async signUp(signUpDto: SignInDto): Promise<any> {
    const { email, password } = signUpDto;
    const supabase = this.supabaseService.getClient();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(data);
      console.log(error);


      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (e) {
      throw e
    }

  }

  async getUser(accessToken: string): Promise<any> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return data;
  }
}
