import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setDescription(
      'This API can create megaverses according to the goal and wipe them automatically.',
    )
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .build();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
