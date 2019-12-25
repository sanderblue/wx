import { Field, ObjectType } from 'type-graphql';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@ObjectType()
export class SnowDepthObservations {
  @Field()
  location: string;

  @Field((type) => [SnowDepthObservationDailyEntity])
  observations: SnowDepthObservationDailyEntity[];
}
