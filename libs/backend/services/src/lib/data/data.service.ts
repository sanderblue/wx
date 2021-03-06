import * as fs from 'fs';
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

  public async saveNew(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    const entities = await this.repository.create(d);

    return await this.repository.saveNew(entities);
  }

  public async update(
    d: SnowDepthObservationDailyEntity[],
  ): Promise<SnowDepthObservationDailyEntity[]> {
    return await this.repository.update(d);
  }

  public async downloadToFile(url: string, dest: string = './'): Promise<any> {
    let file = fs.createWriteStream(dest);

    console.log(`Snow Depth URL: ${url}`);

    // Example URL: NEW    https://www.nwac.us/data-portal/csv/mt-baker-ski-area/sensortype/snow_depth/start-date/2020-11-01/end-date/2020-11-13
    //              OLD    https://www.nwac.us/data-portal/csv/location/mt-baker-ski-area/sensortype/snow_depth/start-date/2019-09-30/end-date/2020-11-14/
    return new Promise((resolve: any, reject: any) => {
      file.on('finish', () => {
        file.close();
        resolve(file);
      });

      axios
        .get(url, {
          responseType: 'stream',
        })
        .then((response: AxiosResponse<fs.WriteStream>) => {
          const stream = response.data;

          stream.on('data', (chunk: ArrayBuffer) => {
            file.write(new Buffer(chunk));
          });

          stream.on('end', () => {
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
      csv({
        flatKeys: true,
      })
        .fromFile(filePath)
        .preFileLine((fileLineString) => {
          return fileLineString.replace(/"" -/gi, '');
        })
        .on('data', (data: Buffer) => {
          const row = this.convertBuffer(data);
          const rowData = this.processDataRow(row);

          rowData.forEach((d) => {
            observationsData.push(d);
          });
        })
        .on('end', () => {
          console.log('Finished converting to JSON.');

          return resolve(observationsData);
        })
        .on('error', (error: Error) => {
          console.error('Error converting csv to json:', error.message);
          return reject(error);
        });
    });
  }

  private processDataRow(row: any): any[] {
    let observationDateTime: Date;
    let observationTimestamp: number;
    let d = [];

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

        d.push({
          timestamp: observationTimestamp,
          date: moment(observationDateTime).format('YYYY-MM-DD'),
          location: location,
          elevation: toNumber(elevation),
          snowDepth: toNumber(snowDepth),
        });
      }
    });

    return d;
  }

  public convertBuffer(data: Buffer): any {
    return JSON.parse(data.toString('utf8'));
  }
}
