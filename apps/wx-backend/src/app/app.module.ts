import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule, DataService } from '@wx/backend/services';

@Module({
  imports: [ServicesModule],
  controllers: [AppController],
  providers: [AppService, DataService]
})
export class AppModule {}
