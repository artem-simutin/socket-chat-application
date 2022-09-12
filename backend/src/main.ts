import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

const PORT = 6060;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

bootstrap();
