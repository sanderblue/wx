const newrelic = require('newrelic');

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

console.log(
  'Has NEW_RELIC_LICENSE_KEY:',
  Boolean(process.env.NEW_RELIC_LICENSE_KEY),
);

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

// console.log('\n\nProduction?', appConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appConfig);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3334;

  try {
    await app.listen(port);

    console.log(`Server running at: https://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log('ERROR:', error);

    throw error;
  }
}

bootstrap();
