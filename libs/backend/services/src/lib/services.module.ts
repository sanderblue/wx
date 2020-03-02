import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data/data.service';
import { CsvService } from './csv/csv.service';
import {
  SnowDepthObservationDailyEntity,
  SnowDepthObservationHourlyEntity,
  WeatherStationEntity,
} from '@wx/backend/entities';
import { SnowDepthObservationDailyRepository } from './repository/snow-depth-observation-daily.repository';
import { SnowDepthObservationHourlyRepository } from './repository/snow-depth-observation-hourly.repository';
import { DataAggregatorService } from './data/data-aggregator.service';
import { WeatherStationRepository } from './repository/weather-station.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnowDepthObservationDailyEntity,
      SnowDepthObservationHourlyEntity,
      WeatherStationEntity,
    ]),
  ],
  providers: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    SnowDepthObservationHourlyRepository,
    DataAggregatorService,
    WeatherStationRepository,
  ],
  exports: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    SnowDepthObservationHourlyRepository,
    DataAggregatorService,
    WeatherStationRepository,
  ],
})
export class ServicesModule {}
