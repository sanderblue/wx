import fs from 'fs';
import moment from 'moment';
import { Controller, Get, Post } from '@nestjs/common';
import {
  SnowDepthObservationDailyRepository,
  DataService,
  DataAggregatorService,
} from '@wx/backend/services';
import { WeatherStationRepository } from '@wx/backend/services';
import { weatherStations } from '@wx/shared/data';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

type LocationString = 'mt-hood' | 'crystal' | 'mt-baker-ski-area';

@Controller('snow')
export class SnowController {
  private locations: LocationString[] = [
    'mt-hood',
    'crystal',
    'mt-baker-ski-area',
  ];

  private pathToFiles = `${__dirname}/assets`;

  constructor(
    private readonly snowRepository: SnowDepthObservationDailyRepository,
    private readonly weatherStationRepository: WeatherStationRepository,
    private readonly dataService: DataService,
    private readonly dataAggregator: DataAggregatorService,
  ) {}

  @Get('/depth')
  public async getSnowDepth(): Promise<any[]> {
    console.log('\n\n');
    console.log('*********************');
    console.log('Querying database...');

    const result = await this.snowRepository.find();

    console.log('RESULT:', result);
    console.log('*********************');
    console.log('\n\n');

    return result;
  }

  @Post('/depth')
  public async postSnowDepth() {
    const today = new Date();
    const startDate = new Date(today);

    // Helps ensure we don't miss any data by overlapping days
    startDate.setDate(startDate.getDate() - 2);

    await Promise.all(
      this.locations.map(async (location) => {
        console.log(
          `\ncron job: start | location: ${location} | startDate: ${startDate} | endDate: ${today}\n`,
        );

        const result = await this.doSnowDepth(location, startDate, today);

        console.log('Snow Depth Complete...', result);
        return result;
      }),
    );

    return {
      message: 'Success',
    };
  }

  @Get('/weather-station')
  public async getWeatherStation() {
    const wxStations = weatherStations;

    const result = await this.weatherStationRepository.save(
      weatherStations as any,
    );

    return result;
  }

  private async doSnowDepth(
    location: LocationString,
    startDate: Date,
    endDate: Date,
  ): Promise<SnowDepthObservationDailyEntity[]> {
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

      return await this.dataService.saveNew(dailyData);
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
