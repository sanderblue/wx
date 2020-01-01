import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data/data.service';
import { CsvService } from './csv/csv.service';
import {
  SnowDepthObservationDailyEntity,
  WeatherStationEntity,
} from '@wx/backend/entities';
import { SnowDepthObservationDailyRepository } from './repository/snow-depth-observation-daily.repository';
import { DataAggregatorService } from './data/data-aggregator.service';
import { WeatherStationRepository } from './repository/weather-station.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnowDepthObservationDailyEntity,
      WeatherStationEntity,
    ]),
  ],
  providers: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    DataAggregatorService,
    WeatherStationRepository,
  ],
  exports: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    DataAggregatorService,
    WeatherStationRepository,
  ],
})
export class ServicesModule {}
