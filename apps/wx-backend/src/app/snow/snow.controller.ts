import { Controller, Get } from '@nestjs/common';
import { SnowDepthObservationDailyRepository } from '@wx/backend/services';
import { WeatherStationRepository } from '@wx/backend/services';
import { weatherStations } from '@wx/shared/data';

@Controller('snow')
export class SnowController {
  constructor(
    private readonly snowRepository: SnowDepthObservationDailyRepository,
    private readonly weatherStationRepository: WeatherStationRepository,
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

  @Get('/weather-station')
  public async getWeatherStation() {
    const wxStations = weatherStations;

    const result = await this.weatherStationRepository.save(
      weatherStations as any,
    );

    return result;
  }
}
