import { Injectable } from '@nestjs/common';
import forIn from 'lodash/forIn';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import mean from 'lodash/mean';
import min from 'lodash/min';
import head from 'lodash/head';
import toNumber from 'lodash/toNumber';
import flatten from 'lodash/flatten';
import filter from 'lodash/filter';
import clone from 'lodash/clone';
import {
  SnowDepthObservationDailyEntity,
  SnowDepthObservationHourlyEntity,
} from '@wx/backend/entities';

interface ObjectGeneric {
  [key: string]: any;
}

@Injectable()
export class DataAggregatorService {
  // Hourly observations cannot deviate more than 18 units
  // from a normal expected value. E.g. snow depth can't be 287.5"
  // at 2pm when it was 89.3" at 1pm.
  private maxDeviation = 18;

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
    let arraysOfData: any[] = [];
    let groupedByLocation = groupBy(data, 'location');

    forIn(groupedByLocation, (locationData: object[], location: string) => {
      let dailyDataResult = this.aggregateDailyValuesForLocation(
        locationData,
        location,
      );

      arraysOfData.push(dailyDataResult);
    });

    return flatten(arraysOfData);
  }

  public aggregateDailyValuesForLocation(data: any, location: string) {
    let groupedByDate = groupBy(data, 'date');

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
          date,
          location,
        );

        let average: number = mean(accurateHourlyValues);

        const isDateForCheck =
          date === '2016-04-13' ||
          date === '2016-04-14' ||
          date === '2016-04-15' ||
          date === '2016-04-16' ||
          date === '2016-04-17';

        if (isDateForCheck && location === 'MtHoodMeadowsBase') {
          console.log(' ');
          console.log(' ');
          console.log('DATE:', date);
          console.log('average:', average);
          console.log(' ');
          console.log(' ');
        }

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

  public getAccurateHourlyObservationData(
    values: number[],
    date: any, // only for debugging
    location: any, // only for debugging
  ): number[] {
    const month = new Date(date).getMonth();
    const isWinter = month === 10 || month === 11 || (month > 0 && month < 4);

    if (isWinter) {
      values = values.filter((v) => v > 0);
    }

    const stdDvtn = this.calculateStandardDeviation(values);
    const invalidDvtn = stdDvtn > this.maxDeviation;
    const median = this.median(values);
    let allowedMinVal = invalidDvtn
      ? min(values) - this.maxDeviation
      : median - stdDvtn;
    let allowedMaxVal = invalidDvtn
      ? min(values) + this.maxDeviation
      : median + stdDvtn;

    if (allowedMinVal < 0) {
      allowedMinVal = 0;
    }

    const results = filter(values, (value: number) => {
      if (isWinter && value <= 0) {
        return false;
      }

      if (value < 0) {
        return false;
      }

      if (value === allowedMinVal) {
        return true;
      }

      if (value === allowedMaxVal) {
        return true;
      }

      return value >= allowedMinVal && value <= allowedMaxVal;
    });

    if (
      (date === '2016-04-13' ||
        date === '2016-04-14' ||
        date === '2016-04-15' ||
        date === '2016-04-16' ||
        date === '2016-04-17') &&
      location === 'MtHoodMeadowsBase'
    ) {
      console.log(' ');
      console.log(' ');

      console.log('DATE:               ', date);
      console.log('MEDIAN:             ', this.median(values));
      console.log('Standard Deviation: ', stdDvtn);
      console.log('Starting Values:    ', values);
      console.log('Min Value:          ', allowedMinVal);
      console.log('Max Value:          ', allowedMaxVal);
      console.log('Accurate Results?:  ', results);
      console.log(' ');
      console.log(' ');
      console.log(' ');
    }

    return results;
  }

  public mapHourlyObservations(
    data: SnowDepthObservationHourlyEntity[],
  ): object[] {
    return map(data, (obj) => {
      return {
        timestamp: obj.timestamp,
        snowDepth: obj.snowDepth > 0 ? toNumber(obj.snowDepth.toFixed(3)) : 0,
        location: obj.location,
      };
    });
  }

  /**
   * Calculates standard deviation of the provided values. If a deviation limit is provided,
   * the standard deviation value cannot be above this value. If the calculated standard
   * devation is above the limit, then the standard deviation will be set to the devation limit.
   */
  public calculateStandardDeviation(
    values: number[],
    deviationLimit?: number,
  ): number {
    let avg = mean(values);
    let varianceValues = map(values, (n: number) => {
      let diff = avg - n;
      let variance = diff * diff;

      return variance;
    });

    let avgVariance = mean(varianceValues);
    let stdDev = Math.sqrt(avgVariance);

    if (deviationLimit && stdDev > deviationLimit) {
      stdDev = deviationLimit;
    }

    return stdDev;
  }

  public median(array: number[]): number {
    const arr = clone(array).sort();

    // If array length is even
    if (arr.length % 2 === 0) {
      return (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
    }

    return arr[(arr.length - 1) / 2];
  }
}
