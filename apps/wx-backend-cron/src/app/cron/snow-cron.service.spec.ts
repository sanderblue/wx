import { Test, TestingModule } from '@nestjs/testing';
import { SnowCronService } from './snow-cron.service';

describe('SnowCronService', () => {
  let service: SnowCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnowCronService],
    }).compile();

    service = module.get<SnowCronService>(SnowCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
