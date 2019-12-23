import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

console.log('__dirname:', __dirname);

const httpsOptions = {
  key: fs.readFileSync(__dirname + '/assets/server.key'),
  cert: fs.readFileSync(__dirname + '/assets/server.crt'),
  requestCert: false,
  rejectUnauthorized: false,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    cors: true,
  });

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.port || 3333;

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
