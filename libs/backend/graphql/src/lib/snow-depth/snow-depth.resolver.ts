import { Resolver, Args, Query } from '@nestjs/graphql';
import { SnowDepthObservations } from './snow-depth-observations.model';
import { SnowDepthObservationDailyRepository } from '@wx/backend/services';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@Resolver((of) => SnowDepthObservations)
export class SnowDepthResolver {
  constructor(
    private readonly snowRepository: SnowDepthObservationDailyRepository,
  ) {}

  @Query((returns) => [SnowDepthObservationDailyEntity])
  async getObservations(@Args('location') location: string) {
    return await this.snowRepository.find({ location });
  }
}
