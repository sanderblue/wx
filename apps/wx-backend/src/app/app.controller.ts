import fs from 'fs';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { DataService } from '@wx/backend/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  public async getData() {}
}
