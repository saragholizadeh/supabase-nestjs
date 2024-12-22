import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from "@nestjs/common";
  import { map, Observable } from "rxjs";
  
  @Injectable()
  export class TransformInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>
    ): Observable<any> {
      return next.handle().pipe(
        map((response) => {
          if (response?.isRenderEjs || !response) return response;
  
          return {
            success: true,
            message: response.message || "Operation Successfully Completed.",
            data: response.data || null,
          };
        })
      );
    }
  }