import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { WeatherStationEntity } from '@wx/backend/entities';

@Injectable()
export class WeatherStationRepository {
  constructor(
    @InjectRepository(WeatherStationEntity)
    private readonly repository: Repository<WeatherStationEntity>,
  ) {}

  public async find(
    conditions: FindConditions<Partial<WeatherStationEntity>> = {},
  ): Promise<WeatherStationEntity[]> {
    return this.repository.find(conditions);
  }

  public async create(
    d: WeatherStationEntity[],
  ): Promise<WeatherStationEntity[]> {
    return this.repository.create(d);
  }

  public async save(
    d: WeatherStationEntity[],
  ): Promise<WeatherStationEntity[]> {
    const entities = await this.repository.create(d);

    return this.repository.save(entities);
  }
}
