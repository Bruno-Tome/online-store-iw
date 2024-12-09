import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Online Store API')
    .setDescription('Online Store API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const options: SwaggerDocumentOptions =  {
     
      deepScanRoutes: true,
    };
  const documentFactory = () => SwaggerModule.createDocument(app, config,options);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

