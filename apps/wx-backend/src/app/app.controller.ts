import fs from 'fs';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { DataService } from '@wx/backend/services';

@Controller()
export class AppController {
  private readonly url: string =
    'https://www.nwac.us/data-portal/csv/location/mt-hood/sensortype/snow_depth/start-date/2014-01-01/end-date/2019-12-14/';

  constructor(
    private readonly appService: AppService,
    private readonly dataService: DataService,
  ) {}

  @Get()
  public async getData() {
    console.log('\n\n\n************************');
    console.log('__dirname', __dirname);

    const pathToFiles = `${__dirname}/assets/data`;
    const pathToFrontendAssets = `/www/wx/dist/apps/wx-frontend/assets/data`;

    const download = await this.dataService.downloadToFile(
      this.url,
      `${pathToFiles}/data.csv`,
    );

    const data = await this.dataService.convertCsvFileToJson(download.path);

    // console.log('DATA:', data);
    const jsonString = JSON.stringify(data);

    fs.writeFileSync(`${pathToFiles}/data.json`, jsonString);
    fs.writeFileSync(`${pathToFrontendAssets}/data.json`, jsonString);

    console.log('************************\n\n\n');

    return {
      message: `Successfully created ${data.length} items.`,
    };
  }
}
