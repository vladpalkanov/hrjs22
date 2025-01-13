import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';

async function bootstrap() {
  const a = await NestFactory.create(UserModule, { bufferLogs: true });
  a.useLogger(a.get(Logger));
  a.use(new CorrelationIdMiddleware().use);
  await a.listen(process.env.PORT ?? 3000);
}
bootstrap();
