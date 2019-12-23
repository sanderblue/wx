import { Test, TestingModule } from '@nestjs/testing';
import { SnowController } from './snow.controller';

describe('Snow Controller', () => {
  let controller: SnowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnowController],
    }).compile();

    controller = module.get<SnowController>(SnowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
