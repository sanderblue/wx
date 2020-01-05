import { Resolver, Args, Query } from '@nestjs/graphql';
import { WeatherStationRepository } from '@wx/backend/services';
import { WeatherStation } from './weather-station.model';

@Resolver('WeatherStation')
export class WeatherStationResolver {
  constructor(private readonly repository: WeatherStationRepository) {}

  @Query((returns) => [WeatherStation])
  async weatherStations() {
    return await this.repository.find();
  }
}
