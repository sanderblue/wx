import { Module } from '@nestjs/common';
import { DataService } from './data/data.service';
import { CsvService } from './csv/csv.service';

@Module({
  providers: [DataService, CsvService],
  exports: [DataService, CsvService]
})
export class ServicesModule {}
