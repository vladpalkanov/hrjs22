import { NestFactory } from "@nestjs/core";
import { RoomModule } from "./room.module";

async function bootstrap() {
  const app = await NestFactory.create(RoomModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
