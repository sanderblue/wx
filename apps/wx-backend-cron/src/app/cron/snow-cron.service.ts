import fs from 'fs';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { DataService, DataAggregatorService } from '@wx/backend/services';

@Injectable()
export class SnowCronService extends NestSchedule {
  constructor(
    private readonly dataService: DataService,
    private readonly dataAggregator: DataAggregatorService,
  ) {
    super();
  }

  @Cron('*/30 * * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    immediate: true,
  })
  async cronJob() {
    console.log('cron job: start', `${__dirname}/assets`);

    const pathToFiles = `${__dirname}/assets`;

    const result = await this.dataService.downloadToFile(
      this.getSnowDepthUrl(new Date('2019-12-01'), new Date()),
      `${pathToFiles}/data.csv`,
    );

    const data = await this.dataService.convertCsvFileToJson(result.path);

    // console.log('CONVERTED CSV TO JSON:', data);

    const dailyData = this.dataAggregator.aggregateDailySnowDepthData(data);
    const dailyResult = JSON.stringify(dailyData);
    const filePath = `${pathToFiles}/snow-depth-observations-daily.json`;

    fs.writeFileSync(filePath, dailyResult);

    console.log('CONVERTED CSV TO JSON:', filePath);

    try {
      await this.dataService.save(dailyData);

      console.log('cron job: end');
    } catch (error) {
      console.error('Error caught:', error.message);
    }
  }

  private getSnowDepthUrl(startDate: Date, endDate: Date): string {
    const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate).format('YYYY-MM-DD');

    console.log(
      `Fetching snow observation data for date range: ${startDateFormatted} to ${endDateFormatted}`,
    );

    return `https://www.nwac.us/data-portal/csv/location/mt-hood/sensortype/snow_depth/start-date/${startDateFormatted}/end-date/${endDateFormatted}/`;
  }
}
