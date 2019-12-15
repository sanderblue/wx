import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('snow_depth_observations_hourly')
export class SnowDepthObservationHourly {
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
  snowDepth: number;
}
