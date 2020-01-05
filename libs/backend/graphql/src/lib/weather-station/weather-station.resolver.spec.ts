import { Test, TestingModule } from '@nestjs/testing';
import { WeatherStationResolver } from './weather-station.resolver';

describe('WeatherStationResolver', () => {
  let resolver: WeatherStationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherStationResolver],
    }).compile();

    resolver = module.get<WeatherStationResolver>(WeatherStationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
