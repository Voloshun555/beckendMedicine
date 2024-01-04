import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3100, () => {
    console.log('Database connection successful');
    console.log(`Server running. Use our API on port: 3100`);
  });
}
bootstrap();
