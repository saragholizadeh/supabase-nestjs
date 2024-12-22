import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'; 
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ["GET", "POST"],
    preflightContinue: false,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    })
  );
  await app.listen(process.env.PORT ?? 3000, ()=>{
    console.log("Hey! application successfully started at port:", process.env.PORT ?? 3000);
  });
}
bootstrap();
