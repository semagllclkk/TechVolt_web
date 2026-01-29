import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const process: { env: { PORT?: string } };


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for production
  app.enableCors({
    origin: [
      'http://www.techvoltsolutions.com.tr', // Production domain
      'https://www.techvoltsolutions.com.tr', // Production domain (HTTPS)
      'https://techvolt.vercel.app', // Production frontend
      'http://localhost:3000', // Local development
      /\.vercel\.app$/, // All Vercel preview deployments
    ],
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();