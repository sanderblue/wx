import { ObjectType, Field, Int, Float } from 'type-graphql';

@ObjectType()
export class WeatherStation {
  @Field((type) => Int)
  id: number;

  @Field()
  location: string;

  @Field((type) => Float)
  latitude: number;

  @Field((type) => Float)
  longitude: number;

  @Field((type) => Int)
  elevation: number;
}
