import { Resolver, Args, Query } from '@nestjs/graphql';
import { WeatherStationRepository } from '@wx/backend/services';
import { WeatherStation } from './weather-station.model';
import { Like } from 'typeorm';

@Resolver((of) => WeatherStation)
export class WeatherStationResolver {
  constructor(private readonly repository: WeatherStationRepository) {}

  @Query((returns) => [WeatherStation])
  async weatherStations(@Args('query') query: string) {
    // return await this.repository.find();
    return await this.repository.findWhere({
      where: [
        {
          location: Like(`%${query}%`),
        },
      ],
    });
  }
}
