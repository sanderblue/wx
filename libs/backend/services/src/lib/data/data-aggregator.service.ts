import { Injectable } from '@nestjs/common';
import forIn from 'lodash/forIn';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import mean from 'lodash/mean';
import head from 'lodash/head';
import toNumber from 'lodash/toNumber';
import flatten from 'lodash/flatten';
import filter from 'lodash/filter';
import {
  SnowDepthObservationDailyEntity,
  SnowDepthObservationHourlyEntity,
} from '@wx/backend/entities';

interface ObjectGeneric {
  [key: string]: any;
}

@Injectable()
export class DataAggregatorService {
  constructor() {}

  public extractLocationsFromData(data: ObjectGeneric[]) {
    return [...new Set(data.map((item: any) => item.location))];
  }

  /**
   * TODO: move this to a proper service
   */
  public aggregateData(data: any) {
    const dailyData = this.aggregateDailySnowDepthData(data);

    // console.log('Daily Data:', dailyData);

    return dailyData;
  }

  /**
   * TODO: move this to a proper service
   */
  public aggregateDailySnowDepthData(data) {
    const locations = this.extractLocationsFromData(data);

    let arraysOfData: any[] = [];
    let aggregatedData: SnowDepthObservationDailyEntity[];
    let groupedByLocation = groupBy(data, 'location');

    forIn(
      groupedByLocation,
      (locationData: Array<object>, location: string) => {
        let dailyDataResult = this.aggregateDailyValuesForLocation(
          locationData,
          location,
        );

        // console.log('dailyDataResult', dailyDataResult);

        arraysOfData.push(dailyDataResult);
      },
    );

    return flatten(arraysOfData);
  }

  public aggregateDailyValuesForLocation(data: any, location: string) {
    let groupedByDate = groupBy(data, 'date');

    // console.log('groupedByDate', groupedByDate);

    return map(
      groupedByDate,
      (groupedData: SnowDepthObservationHourlyEntity[], date: string) => {
        let hourlyObservations = this.mapHourlyObservations(groupedData);
        let hourlyObservationValues: number[] = map(
          hourlyObservations,
          'snowDepth',
        );
        let accurateHourlyValues = this.getAccurateHourlyObservationData(
          hourlyObservationValues,
        );
        let average: any = mean(accurateHourlyValues);

        // console.log('_.head(hourlyObservations).location', _.head(hourlyObservations).location);

        return {
          timestamp: new Date(date).getTime(),
          date: date,
          location: location,
          elevation: head(groupedData).elevation,
          averageSnowDepthForDate: toNumber(average.toFixed(2)),
          hourlyObservations: accurateHourlyValues,
        };
      },
    );
  }

  public getAccurateHourlyObservationData(values: number[]): number[] {
    let potentiallyInaccurateMeanValue = mean(values);
    let stdDvtn = this.calculateStandardDeviation(values);

    let allowedMinVal = potentiallyInaccurateMeanValue - stdDvtn;
    let allowedMaxVal = potentiallyInaccurateMeanValue + stdDvtn;

    return filter(values, (value: any) => {
      if (value < 0) {
        return false;
      }

      if (value === allowedMinVal) {
        return true;
      }

      if (value === allowedMaxVal) {
        return true;
      }

      return value > allowedMinVal && value < allowedMaxVal;
    });
  }

  public mapHourlyObservations(data: any): Array<object> {
    return map(data, (obj: any) => {
      let snowDepth = parseFloat(obj.snowDepth);

      return {
        timestamp: obj.timestamp,
        snowDepth: snowDepth > 0 ? toNumber(snowDepth.toFixed(3)) : 0,
        location: obj.location,
      };
    });
  }

  public calculateStandardDeviation(values: number[]): number {
    let avg = mean(values);
    let varianceValues = map(values, (n: number) => {
      let diff = avg - n;
      let variance = diff * diff;

      return variance;
    });

    let avgVariance = mean(varianceValues);

    return Math.sqrt(avgVariance);
  }
}
