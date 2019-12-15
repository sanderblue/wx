import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('snow_depth_observations_daily')
@Index(
  'location_date',
  (entity: SnowDepthObservationDaily) => [entity.location, entity.date],
  { unique: true },
)
export class SnowDepthObservationDaily {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  location: string;

  @Index()
  @Column()
  date: string;

  @Column()
  timestamp: number;

  @Column()
  elevation: number;

  @Column()
  averageSnowDepthForDate: number;

  @Column('text', { array: true })
  hourlyObservations: number[];
}
