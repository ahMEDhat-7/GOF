import {
  NestInterceptor,
  Injectable,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before Route Handle');
    return next.handle().pipe(
      map((dataFromResponse) => {
        const {
          password,
          holder_id,
          createdAt,
          updatedAt,
          role,
          ...otherData
        } = dataFromResponse;
        return otherData;
      }),
    );
  }
}
