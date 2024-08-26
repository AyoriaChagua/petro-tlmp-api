import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://192.168.1.12:4500',
    'http://190.116.6.12:4500'
  ]
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed'), false);
      }
    },
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Origin, Content-Type, Accept, X-Token, Authorization',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(4500);
}
bootstrap();
