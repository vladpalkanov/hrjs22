import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const h = req.headers['x-correlation-id'];
    const c = !h ? uuid() : Array.isArray(h) ? h[0] : h;
    (req as any).correlationId = c;
    res.setHeader('X-Correlation-Id', c);
    next();
  }
}
