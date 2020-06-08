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
  async observations(
    @Args({ name: 'locations', type: () => [String] })
    locations: string[] = [],
  ) {
    if (!locations.length) {
      return [];
    }

    const query = locations.map((v) => {
      return {
        location: v,
      };
    });

    return await this.snowRepository.findWhere({
      where: query,
    });
  }
}
