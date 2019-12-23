import { Controller, Get } from '@nestjs/common';
import { SnowDepthObservationDailyRepository } from '@wx/backend/services';

@Controller('snow')
export class SnowController {
  constructor(
    private readonly snowRepository: SnowDepthObservationDailyRepository,
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
}
