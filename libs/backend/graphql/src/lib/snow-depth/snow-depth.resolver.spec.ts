import { Test, TestingModule } from '@nestjs/testing';
import { SnowDepthResolver } from './snow-depth.resolver';

describe('SnowDepthResolver', () => {
  let resolver: SnowDepthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnowDepthResolver],
    }).compile();

    resolver = module.get<SnowDepthResolver>(SnowDepthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
