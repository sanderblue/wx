import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import toSafeInteger from 'lodash/toSafeInteger';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule, DataService } from '@wx/backend/services';
import { SnowController } from './snow/snow.controller';
import {
  SnowDepthObservationDailyEntity,
  WeatherStationEntity,
} from '@wx/backend/entities';
import { AppGraphQLModule } from '@wx/backend/graphql';

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
      entities: [SnowDepthObservationDailyEntity, WeatherStationEntity],
      synchronize: process.env.ENVIRONMENT === 'production' ? false : true,
      ssl: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: `${__dirname}/schema.gql`,
      cors: true,
    }),
    AppGraphQLModule,
  ],
  controllers: [AppController, SnowController],
  providers: [AppService, DataService],
})
export class AppModule {}
