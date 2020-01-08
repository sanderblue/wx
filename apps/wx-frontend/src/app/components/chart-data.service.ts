import { SnowDepthObservationDaily } from '@wx/shared/data';
import { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

export interface Series {
  series: ApexAxisChartSeries;
  xAxisLabels: string[];
}

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

export function generateSeries(locations: any[], obs): Series {
  let xAxisLabels: string[] = [];

  const series = locations.map((location) => {
    const matched = obs.filter(
      (d: SnowDepthObservationDaily) => d.location === location,
    );
    const dataSet = orderBy(matched, ['date'], ['desc']);
    const dataSeries = getDataForDateRange(
      dataSet,
      new Date('2019-011-20'),
      new Date(),
    );

    xAxisLabels = dataSeries.map((o) => o.date).reverse();

    return {
      name: location,
      data: getNurmericalSeriesData<SnowDepthObservationDaily>(
        dataSeries,
        'averageSnowDepthForDate',
      ),
    };
  });

  return {
    series,
    xAxisLabels,
  };
}
