import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`app-transaction - ${process.env.PG_HOST || 'localhost'}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
