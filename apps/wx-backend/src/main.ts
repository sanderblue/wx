import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const isProd = process.env.ENVIRONMENT === 'production';

const SSL_KEY_FILE = isProd
  ? '/var/www/wx/server.key'
  : __dirname + '/assets/server.key';

const SSL_CERT_FILE = isProd
  ? '/var/www/wx/server.crt'
  : __dirname + '/assets/server.crt';

const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_FILE),
  cert: fs.readFileSync(SSL_CERT_FILE),
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

  const port = process.env.PORT || 3334;

  await app.listen(port, () => {
    console.log('Listening at https://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
