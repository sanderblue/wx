import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';

@Module({
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
