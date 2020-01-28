import {
  SnowDepthObservationDaily,
  MapStringBoolean,
  SeasonsData,
} from '@wx/shared/data';
import { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import fill from 'lodash/fill';
import moment from 'moment';

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

export function generateSeriesData(
  name: string,
  d: SnowDepthObservationDaily[],
  startDate: string,
  endDate: string,
  itemsCount?: number,
) {
  const dataSet = orderBy(d, ['date'], ['desc']);
  const dataSeries = getDataForDateRange(
    dataSet,
    new Date(startDate),
    new Date(endDate),
  );

  let rawData = getNurmericalSeriesData<SnowDepthObservationDaily>(
    dataSeries,
    'averageSnowDepthForDate',
  );

  const originalArrayLength = dataSeries.length;

  // Ensure each dataset is the same length, which
  // facilitates the tooltip showing data for every
  // plotted series
  rawData.length = itemsCount;

  // If dataset array length doesn't have enough data
  // to fill the rest of the timeline, we need to append
  // null values for the rest of the array so the line
  // won't show a zero value.
  if (originalArrayLength < itemsCount) {
    fill(rawData, null, dataSeries.length);
  }

  return {
    name,
    data: rawData,
  };
}

export function generateSeries(
  locations: any[],
  startDate: string,
  endDate: string,
  obs,
): Series {
  let xAxisLabels: string[] = [];

  const series = locations.map((location) => {
    const matched = obs.filter(
      (d: SnowDepthObservationDaily) => d.location === location,
    );
    const dataSet = orderBy(matched, ['date'], ['desc']);
    const dataSeries = getDataForDateRange(
      dataSet,
      new Date(startDate),
      new Date(endDate),
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

export function generateSeasonsData(
  years: MapStringBoolean,
  observations: SnowDepthObservationDaily[],
  itemsCount: number,
): SeasonsData {
  const seasons = {};

  Object.keys(years).forEach((yr) => {
    const sYear = Number.parseInt(yr) + 1;
    const startDateStr = `${yr}-10-02`;
    const endDateStr = `${sYear}-06-02`;
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const series = generateSeriesData(
      yr,
      observations,
      startDateStr,
      endDateStr,
      itemsCount,
    );

    seasons[yr] = {
      startDate,
      endDate,
      series: [series],
    };
  });

  return seasons;
}

export function concatSeries(years: MapStringBoolean, seasons: SeasonsData) {
  let series = [];

  for (const [key, checked] of Object.entries(years)) {
    if (checked) {
      series = series.concat(seasons[key].series);
    }
  }

  return series;
}
