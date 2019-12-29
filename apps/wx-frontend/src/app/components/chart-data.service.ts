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
    const timestamp = new Date(item.date).getTime();

    return timestamp >= startTimestamp && timestamp <= endTimestamp;
  });
}

export function getNurmericalSeriesData<T>(data: T[], key: string): number[] {
  return data.map((o) => o[key]).reverse();
}
