import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ALSService } from '../als.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IncomingInterceptor implements NestMiddleware {
  constructor(private readonly alsService: ALSService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const correlationId = req.headers['x-correlation-id'] || uuidv4();

    this.alsService.runWithContext(() => {
      this.alsService.set('X-Correlation-Id', correlationId);
      next();
    });
  }
}
