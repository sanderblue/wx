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

  public async find(): Promise<any[]> {
    return this.repository.find();
  }

  public async create(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    return this.repository.create(d);
  }

  public async save(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    const entities = await this.repository.create(d);

    return this.repository.save(entities);
  }

  public async saveOne(
    d: SnowDepthObservationDailyEntity,
  ): Promise<SnowDepthObservationDailyEntity> {
    return this.repository.save(d);
  }

  public async saveNew(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    return await Promise.all(
      d.map(async (s, i) => {
        const exists = await this.repository.findOne({
          location: s.location,
          date: s.date,
        });

        if (!exists) {
          console.log('Saving new entity:', s);
          return this.saveOne(s);
        }
      }),
    );
  }
}
