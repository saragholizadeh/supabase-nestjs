import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@supabase/supabase-js";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user;
    return request.user.user;
  }
);