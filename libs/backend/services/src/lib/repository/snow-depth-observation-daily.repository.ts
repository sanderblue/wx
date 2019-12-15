import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, UpdateResult } from 'typeorm';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@Injectable()
export class SnowDepthObservationDailyRepository {
  constructor(
    @InjectRepository(SnowDepthObservationDailyEntity)
    private readonly repository: Repository<SnowDepthObservationDailyEntity>,
  ) {}

  public async createEntity(d) {
    return await this.repository.create(d);
  }

  public async save(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    const entities = await this.repository.create(d);
    const result = await this.repository.save(entities);

    return result;
  }
}
