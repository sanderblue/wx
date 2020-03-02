import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, UpdateResult } from 'typeorm';
import { SnowDepthObservationHourlyEntity } from '@wx/backend/entities';

@Injectable()
export class SnowDepthObservationHourlyRepository {
  constructor(
    @InjectRepository(SnowDepthObservationHourlyEntity)
    private readonly repository: Repository<SnowDepthObservationHourlyEntity>,
  ) {}

  public async find(
    conditions: FindConditions<Partial<SnowDepthObservationHourlyEntity>> = {},
  ): Promise<SnowDepthObservationHourlyEntity[]> {
    return this.repository.find(conditions);
  }

  public async findWhere(
    conditions: any,
  ): Promise<SnowDepthObservationHourlyEntity[]> {
    return this.repository.find(conditions);
  }

  public async create(
    d: SnowDepthObservationHourlyEntity[],
  ): Promise<SnowDepthObservationHourlyEntity[]> {
    return this.repository.create(d);
  }

  public async save(
    d: SnowDepthObservationHourlyEntity[],
  ): Promise<SnowDepthObservationHourlyEntity[]> {
    const entities = await this.repository.create(d);

    return this.repository.save(entities);
  }

  public async saveOne(
    d: SnowDepthObservationHourlyEntity,
  ): Promise<SnowDepthObservationHourlyEntity> {
    return this.repository.save(d);
  }

  public async saveNew(
    d: SnowDepthObservationHourlyEntity[],
  ): Promise<SnowDepthObservationHourlyEntity[]> {
    return await Promise.all(
      d.map(async (entity) => {
        const conditions = {
          location: entity.location,
          date: entity.date,
        };

        const exists = await this.repository.findOne(conditions);

        if (!exists) {
          return this.saveOne(entity);
        }

        // this.updateOne(conditions, entity);
      }),
    );
  }

  public async update(d: SnowDepthObservationHourlyEntity[]): Promise<any[]> {
    return await Promise.all(
      d.map(async (s, i) => {
        return await this.updateOne(
          {
            location: s.location,
            date: s.date,
          },
          s,
        );
      }),
    );
  }

  public async updateOne(
    conditions: FindConditions<Partial<SnowDepthObservationHourlyEntity>>,
    entity: SnowDepthObservationHourlyEntity,
  ): Promise<SnowDepthObservationHourlyEntity> {
    try {
      // console.log('');
      // console.log('UPDATE ONE:', entity);
      // console.log('');

      await this.repository.update(conditions, entity);

      return entity;
    } catch (error) {
      console.error(`ERROR - ${this.constructor.name}:`, error);
    }
  }
}
