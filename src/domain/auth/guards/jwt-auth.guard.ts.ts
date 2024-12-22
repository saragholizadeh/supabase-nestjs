import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.supabaseService.getClient().auth.getUser(token);
    console.log(user.data.user);

    if (!user.data.user) {
      console.log('??')
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = user.data.user;
    return true;
  }
}
