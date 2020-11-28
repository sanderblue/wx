import fs from 'fs';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { DataService, DataAggregatorService } from '@wx/backend/services';

type LocationString =
  | 'mt-hood'
  | 'crystal'
  | 'mt-baker-ski-area'
  | 'mt-rainier'
  | 'snoqualmie-pass'
  | 'washington-pass';

@Injectable()
export class SnowCronService extends NestSchedule {
  private locations: LocationString[] = [
    'mt-hood',
    'crystal',
    'mt-baker-ski-area',
    'mt-rainier',
    'snoqualmie-pass',
    'washington-pass',
  ];

  private pathToFiles = `${__dirname}/assets`;

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
    // Get data starting from 30 days ago
    const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
    const endDate = new Date();

    await Promise.all(
      this.locations.map(async (location) => {
        console.log(
          `\ncron job: start | location: ${location} | startDate: ${startDate} | endDate: ${endDate}\n`,
        );

        return await this.execute(location, startDate, endDate);
      }),
    );

    console.log('cron job: end\n');
  }

  private async execute(
    location: LocationString,
    startDate: Date,
    endDate: Date,
  ) {
    console.log('cron job: execute\n');

    try {
      const result = await this.dataService.downloadToFile(
        this.getSnowDepthUrl(location, startDate, endDate),
        `${this.pathToFiles}/data-${location}.csv`,
      );

      const data = await this.dataService.convertCsvFileToJson(result.path);
      const dailyData = this.dataAggregator.aggregateDailySnowDepthData(data);
      const dailyResult = JSON.stringify(dailyData);
      const filePath = `${this.pathToFiles}/snow-depth-observations-daily-${location}.json`;

      fs.writeFileSync(filePath, dailyResult);

      await this.dataService.saveNew(dailyData);
    } catch (error) {
      console.error('Error caught:', error.message);
    }
  }

  private getSnowDepthUrl(
    location: LocationString,
    startDate: Date,
    endDate: Date,
  ): string {
    const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate).format('YYYY-MM-DD');

    console.log(
      `Fetching snow observation data for date range: ${startDateFormatted} to ${endDateFormatted}`,
    );

    return `https://www.nwac.us/data-portal/csv/${location}/sensortype/snow_depth/start-date/${startDateFormatted}/end-date/${endDateFormatted}/`;
  }
}

// https://www.nwac.us/data-portal/csv/location/crystal/sensortype/snow_depth/start-date/2019-01-01/end-date/2019-12-25/
