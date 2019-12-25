import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// console.log('');
// console.log('****************');
// console.log('PORT:', process.env.PORT);
// console.log('****************');
// console.log('');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 4444;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
