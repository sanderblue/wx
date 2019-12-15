import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { DataService, DataAggregatorService } from '@wx/backend/services';

@Injectable()
export class SnowCronService extends NestSchedule {
  private readonly url: string =
    'https://www.nwac.us/data-portal/csv/location/mt-hood/sensortype/snow_depth/start-date/2014-01-01/end-date/2019-12-15/';

  constructor(
    private readonly dataService: DataService,
    private readonly dataAggregator: DataAggregatorService,
  ) {
    super();
  }

  @Cron('* * * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    immediate: true,
  })
  async cronJob() {
    console.log('cron job: start', `${__dirname}/assets`);

    const pathToFiles = `${__dirname}/assets`;

    const result = await this.dataService.downloadToFile(
      this.url,
      `${pathToFiles}/data.csv`,
    );

    const data = await this.dataService.convertCsvFileToJson(result.path);
    const dailyData = this.dataAggregator.aggregateDailySnowDepthData(data);

    console.log('Daily Data:', dailyData[0]);

    const dailyResult = JSON.stringify(dailyData);

    fs.writeFileSync(
      `${pathToFiles}/snow-depth-observations-daily.json`,
      dailyResult,
    );

    this.dataService.save(dailyData);

    console.log('cron job: end');
  }
}
