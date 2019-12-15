import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('snow_depth_observations_daily')
@Index(
  'location_date',
  (entity: SnowDepthObservationDailyEntity) => [entity.location, entity.date],
  { unique: true },
)
export class SnowDepthObservationDailyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('text')
  location: string;

  @Index()
  @Column('text')
  date: string;

  @Column('bigint')
  timestamp: number;

  @Column('integer')
  elevation: number;

  @Column('float')
  averageSnowDepthForDate: number;

  @Column('text', { array: true })
  hourlyObservations: number[];
}
