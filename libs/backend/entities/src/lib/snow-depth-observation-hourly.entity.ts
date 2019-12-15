import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('snow_depth_observations_hourly')
export class SnowDepthObservationHourlyEntity {
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
  snowDepth: number;
}
