import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('weather_stations')
export class WeatherStationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('text')
  location: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('integer')
  elevation: number;
}
