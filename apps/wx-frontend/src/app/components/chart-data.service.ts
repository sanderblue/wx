import { SnowDepthObservationDaily } from '@wx/shared/data';
import { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';

export function groupByLocation(
  data: SnowDepthObservationDaily[],
): Dictionary<SnowDepthObservationDaily[]> {
  return groupBy(data, 'location');
}

export function getDataForDateRange(
  data: SnowDepthObservationDaily[],
  startDate: Date,
  endDate: Date,
) {
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = new Date(endDate).getTime();

  return data.filter((item) => {
    return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
  });
}

export class ChartDataService {
  constructor() {}

  public groupByLocation(
    data: SnowDepthObservationDaily[],
  ): Dictionary<SnowDepthObservationDaily[]> {
    return groupBy(data, 'location');
  }

  public getDataForDateRange(
    data: SnowDepthObservationDaily[],
    startDate: Date,
    endDate: Date,
  ) {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    return data.filter((item) => {
      return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
    });
  }
}
