import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow these HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allow these headers
  });

  // Set the payload limit to 10MB
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
