import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('before controller');
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(`after controller... ${Date.now() - now}ms`);
        return {
          data,
          status: 'success',
          responseTime: `${Date.now() - now}ms`,
        } ;
      }),
    );
  }
}
