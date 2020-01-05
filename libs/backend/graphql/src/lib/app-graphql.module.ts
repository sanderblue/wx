import { Module } from '@nestjs/common';
import { SnowDepthResolver } from './snow-depth/snow-depth.resolver';
import { ServicesModule } from '@wx/backend/services';
import { WeatherStationResolver } from './weather-station/weather-station.resolver';

@Module({
  imports: [ServicesModule],
  providers: [SnowDepthResolver, WeatherStationResolver],
})
export class AppGraphQLModule {}
