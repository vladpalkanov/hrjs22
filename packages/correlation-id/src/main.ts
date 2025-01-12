import { NestFactory } from '@nestjs/core';
import { ALSModule } from './als.module';

async function bootstrap() {
  const app = await NestFactory.create(ALSModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
