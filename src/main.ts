import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port')
  app.useGlobalPipes(new ValidationPipe())



  const config = new DocumentBuilder()
    .setTitle('Lesons api')
    .setDescription(' This api for studying')
    .setVersion("1")
    .addTag('API')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)


  await app.listen(port);
}
bootstrap();


//mongodb+srv://user:user@cluster0.hknn74y.mongodb.net/testNest?retryWrites=true&w=majority