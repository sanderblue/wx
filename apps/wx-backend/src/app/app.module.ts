import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import toSafeInteger from 'lodash/toSafeInteger';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule, DataService } from '@wx/backend/services';
import { SnowController } from './snow/snow.controller';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@Module({
  imports: [
    ServicesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: toSafeInteger(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'defaultdb',
      entities: [SnowDepthObservationDailyEntity],
      synchronize: process.env.ENVIRONMENT === 'production' ? false : true,
      ssl: true,
    }),
  ],
  controllers: [AppController, SnowController],
  providers: [AppService, DataService],
})
export class AppModule {}
