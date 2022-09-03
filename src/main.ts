import { NestFactory } from '@nestjs/core';
import { config, ConfigService } from 'aws-sdk';
import bodyParser, { json } from 'body-parser';
import { urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(
    urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
