import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data/data.service';
import { CsvService } from './csv/csv.service';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';
import { SnowDepthObservationDailyRepository } from './repository/snow-depth-observation-daily.repository';
import { DataAggregatorService } from './data/data-aggregator.service';

@Module({
  imports: [TypeOrmModule.forFeature([SnowDepthObservationDailyEntity])],
  providers: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    DataAggregatorService,
  ],
  exports: [
    DataService,
    CsvService,
    SnowDepthObservationDailyRepository,
    DataAggregatorService,
  ],
})
export class ServicesModule {}
