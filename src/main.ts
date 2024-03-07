import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
  });
  const config = new DocumentBuilder()
    .setTitle('Banking API')
    .setDescription('Esta API simula as funcionalidades básicas de um banco, permitindo transferências PIX, saques, depósitos, criação de usuários e consulta de saldo.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
 
  SwaggerModule.setup('documentation', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true})
  app.useGlobalPipes(new ValidationPipe());

  
  await app.listen(3000);
}
bootstrap();
