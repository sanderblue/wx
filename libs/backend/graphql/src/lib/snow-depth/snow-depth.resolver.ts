import { Resolver, Args, Query } from '@nestjs/graphql';
import {
  SnowDepthObservation,
  SnowDepthObservations,
} from './snow-depth-observations.model';
import { SnowDepthObservationDailyRepository } from '@wx/backend/services';

@Resolver((of) => SnowDepthObservations)
export class SnowDepthResolver {
  constructor(
    private readonly snowRepository: SnowDepthObservationDailyRepository,
  ) {}

  @Query((returns) => [SnowDepthObservation])
  async observations(@Args('location') location: string) {
    return await this.snowRepository.find({ location });
  }
}
