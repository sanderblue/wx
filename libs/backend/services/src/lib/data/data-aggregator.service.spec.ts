import { Test, TestingModule } from '@nestjs/testing';
import { DataAggregatorService } from './data-aggregator.service';

describe('DataAggregatorService', () => {
  let service: DataAggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAggregatorService],
    }).compile();

    service = module.get<DataAggregatorService>(DataAggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
