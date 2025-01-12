import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ALSService } from '../als.service';

@Injectable()
export class OutgoingInterceptor implements NestInterceptor {
  constructor(private readonly alsService: ALSService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const correlationId = this.alsService.get<string>('X-Correlation-Id');

    if (context.getType() === 'http') {
      const response = context.switchToHttp().getResponse();
      if (correlationId) {
        response.setHeader('X-Correlation-Id', correlationId);
      }
    }

    return next.handle().pipe(
      tap(() => {
        if (correlationId) {
          console.log(`[Outgoing Request] X-Correlation-Id: ${correlationId}`);
        }
      }),
    );
  }
}
