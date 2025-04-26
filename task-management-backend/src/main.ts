import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Bu önemli yoksa frontend istek atamaz
  await app.listen(3000);
}
bootstrap();
