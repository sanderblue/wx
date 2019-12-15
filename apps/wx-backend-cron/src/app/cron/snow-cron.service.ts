import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { DataService } from '@wx/backend/services';

@Injectable()
export class SnowCronService extends NestSchedule {
  private readonly url: string =
    'https://www.nwac.us/data-portal/csv/location/mt-hood/sensortype/snow_depth/start-date/2014-01-01/end-date/2019-12-15/';

  constructor(private readonly dataService: DataService) {
    super();
  }

  @Cron('* * * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    immediate: true,
  })
  async cronJob() {
    console.log('executing cron job');

    const pathToFiles = `${__dirname}/assets`;

    const result = await this.dataService.downloadToFile(
      this.url,
      `${pathToFiles}/data.csv`,
    );

    const data = await this.dataService.convertCsvFileToJson(result.path);

    const jsonString = JSON.stringify(data);

    fs.writeFileSync(`${pathToFiles}/data.json`, jsonString);

    console.log('CRON Result:', result);
  }
}
