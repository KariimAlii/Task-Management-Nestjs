import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Generate swagger.json file
  writeFileSync('./swagger.json', JSON.stringify(document));

  // Optional: Keep the UI available
  SwaggerModule.setup('swagger', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
