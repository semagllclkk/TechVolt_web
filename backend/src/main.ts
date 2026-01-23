import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS (Frontend'den erişim için)
  app.enableCors({
    origin: ['http://localhost:3000', 'https://techvoltsolutions.com.tr'],
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
  console.log('🚀 Backend running on http://localhost:4000');
}
bootstrap();