import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common';
import { AppModule } from './app/app.module';

const isProd = process.env.ENVIRONMENT === 'production';

let appConfig: NestApplicationOptions = {
  cors: {
    origin: '*', // for better security, specific allowed origins
  },
};

if (!isProd) {
  appConfig = {
    ...appConfig,
    httpsOptions: {
      key: fs.readFileSync(__dirname + '/assets/server.key'),
      cert: fs.readFileSync(__dirname + '/assets/server.crt'),
      requestCert: false,
      rejectUnauthorized: false,
    },
  };
}

async function bootstrap() {
  const port = process.env.PORT || 3334;
  const globalPrefix = 'api';
  const app = await NestFactory.create(AppModule, appConfig);

  app.setGlobalPrefix(globalPrefix);

  try {
    await app.listen(port);
  } catch (error) {
    console.log(`ERROR - ${this.constructor.name}:`, error);

    throw error;
  }
}

bootstrap();
