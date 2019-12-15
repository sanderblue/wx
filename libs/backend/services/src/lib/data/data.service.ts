import * as fs from 'fs';
import * as http from 'http';
import * as moment from 'moment';
import * as csv from 'csvtojson';
import axios, { AxiosResponse } from 'axios';
import forIn from 'lodash/forIn';
import toNumber from 'lodash/toNumber';
import { Injectable } from '@nestjs/common';
import { CsvService } from '../csv/csv.service';
import { SnowDepthObservationDailyRepository } from '../repository/snow-depth-observation-daily.repository';
import { SnowDepthObservationDailyEntity } from '@wx/backend/entities';

@Injectable()
export class DataService {
  constructor(
    private readonly csvService: CsvService,
    private readonly repository: SnowDepthObservationDailyRepository,
  ) {}

  public async save(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    const entities = await this.repository.createEntity(d);

    return await this.repository.save(entities);
  }

  public async downloadToFile(url: string, dest: string = './'): Promise<any> {
    let file = fs.createWriteStream(dest);

    return new Promise((resolve: any, reject: any) => {
      file.on('finish', () => {
        file.close();

        console.log('\nFINISHED WRITING CSV TO FILE');
        console.log('\n\n\n');

        resolve(file);
      });

      axios
        .get(url, {
          responseType: 'stream',
        })
        .then((response: AxiosResponse<fs.WriteStream>) => {
          const stream = response.data;

          stream.on('data', (chunk: ArrayBuffer) => {
            console.log('streaming data...');

            file.write(new Buffer(chunk));
          });

          stream.on('end', () => {
            console.log('streaming end...');

            file.end();
          });
        })
        .catch((error: any) => {
          console.error(`ERROR: ${error.message}`);

          reject(error);
        });
    });
  }

  public convertCsvFileToJson(filePath: string): Promise<any> {
    let observationsData: any[] = [];

    return new Promise((resolve, reject) => {
      csv()
        .fromFile(filePath)
        .on('data', (data: Buffer) => {
          const row = this.convertBuffer(data);
          const rowData = this.processDataRow(row);

          observationsData.push(rowData);
        })
        .on('end', () => {
          console.log('Finished converting to JSON.');

          resolve(observationsData);
        })
        .on('error', (error: Error) => {
          console.error('Error converting csv to json:', error.message);
          reject(error);
        });
    });
  }

  private processDataRow(row: any): { [key: string]: any } {
    let observationDateTime: Date;
    let observationTimestamp: number;
    let d = {};

    // consider map, reduce, etc
    forIn(row, (value, key) => {
      let elevation: string;
      let location: string;
      let snowDepth: string;

      if (this.csvService.isDateTimeKey(key)) {
        observationDateTime = new Date(value);
        observationTimestamp = observationDateTime.getTime();
      } else {
        elevation = this.csvService.extractNumberFromKey(key);
        location = this.csvService.extractStringFromKey(key);
        snowDepth = value;

        d = {
          timestamp: observationTimestamp,
          date: moment(observationDateTime).format('YYYY-MM-DD'),
          location: location,
          elevation: toNumber(elevation),
          snowDepth: toNumber(snowDepth),
        };
      }
    });

    return d;
  }

  public convertBuffer(data: Buffer): any {
    return JSON.parse(data.toString('utf8'));
  }
}
