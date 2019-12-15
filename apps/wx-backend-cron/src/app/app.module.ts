import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { toSafeInteger } from 'lodash';
import { ScheduleModule } from 'nest-schedule';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';
import { SnowCronService } from './cron/snow-cron.service';
import { ServicesModule } from '@wx/backend/services';

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
    ScheduleModule.register(),
  ],
  controllers: [],
  providers: [SnowCronService],
})
export class AppModule {}
