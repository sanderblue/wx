import fs from 'fs';
import moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Cron, NestSchedule } from 'nest-schedule';
import { DataService, DataAggregatorService } from '@wx/backend/services';

type LocationString = 'mt-hood' | 'crystal' | 'mt-baker-ski-area';

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
    const location: LocationString = 'mt-baker-ski-area';
    const startDate = new Date('2014-01-01');
    const endDate = new Date('2019-12-26');

    console.log(
      `\ncron job: start | location: ${location} | startDate: ${startDate} | endDate: ${endDate}\n`,
    );

    const pathToFiles = `${__dirname}/assets`;

    const result = await this.dataService.downloadToFile(
      this.getSnowDepthUrl(location, startDate, endDate),
      `${pathToFiles}/data.csv`,
    );

    const data = await this.dataService.convertCsvFileToJson(result.path);

    // console.log('CONVERTED CSV TO JSON:', data);

    const dailyData = this.dataAggregator.aggregateDailySnowDepthData(data);
    const dailyResult = JSON.stringify(dailyData);
    const filePath = `${pathToFiles}/snow-depth-observations-daily-${location}.json`;

    fs.writeFileSync(filePath, dailyResult);

    console.log('CONVERTED CSV TO JSON:', filePath);

    try {
      await this.dataService.save(dailyData);

      console.log('cron job: end');
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

    return `https://www.nwac.us/data-portal/csv/location/${location}/sensortype/snow_depth/start-date/${startDateFormatted}/end-date/${endDateFormatted}/`;
  }
}

// https://www.nwac.us/data-portal/csv/location/crystal/sensortype/snow_depth/start-date/2019-01-01/end-date/2019-12-25/
