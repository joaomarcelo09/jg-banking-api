import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Banking API')
    .setDescription('Esta API simula as funcionalidades básicas de um banco, permitindo transferências PIX, saques, depósitos, criação de usuários e consulta de saldo.')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api', {
  });

  await app.listen(3000);
}
bootstrap();
