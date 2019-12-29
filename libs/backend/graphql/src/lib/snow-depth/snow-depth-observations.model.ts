import { ObjectType, Field, Int, Float } from 'type-graphql';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@ObjectType()
export class SnowDepthObservation {
  @Field((type) => Int)
  id: number;

  @Field()
  location: string;

  @Field()
  date: string;

  @Field((type) => Int)
  timestamp: number;

  @Field((type) => Int)
  elevation: number;

  @Field((type) => Float)
  averageSnowDepthForDate: number;

  @Field((type) => [Float])
  hourlyObservations: number[];
}

@ObjectType()
export class SnowDepthObservations {
  @Field()
  location: string;

  @Field((type) => [SnowDepthObservation])
  observations: SnowDepthObservation[];
}
