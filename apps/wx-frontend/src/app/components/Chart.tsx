import React from 'react';
import ReactApexChart from 'react-apexcharts';
import orderBy from 'lodash/orderBy';
import { useQuery } from '@apollo/react-hooks';

import {
  getDataForDateRange,
  getNurmericalSeriesData,
} from './chart-data.service';
import { SnowDepthObservationDaily } from '@wx/shared/data';
import { ApexOptions } from 'apexcharts';
import { GET_OBSERVATIONS } from '../graphql/queries';
import { parseJSON } from '../utils';

interface State {
  options: ApexOptions;
  series: ApexAxisChartSeries;
}

interface ChartProps {
  locations: string;
}

/**
 * Component
 */
export const Chart = (props: ChartProps) => {
  const locations = parseJSON<string[]>(props.locations, []);

  console.log('Chart LOCATIONS:', locations);

  const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      locations,
    },
  });

  // console.log('DATA:', data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const obs: any[] = data ? data.observations : [];
  let dates = [];

  const seriez = locations.map((location) => {
    const matched = obs.filter(
      (d: SnowDepthObservationDaily) => d.location === location,
    );
    const dataSet = orderBy(matched, ['date'], ['desc']);
    const dataSeries = getDataForDateRange(
      dataSet,
      new Date('2019-011-20'),
      new Date(),
    );

    if (!data.length) {
      dates = dataSeries.map((o) => o.date).reverse();
    }

    return {
      name: location,
      data: getNurmericalSeriesData<SnowDepthObservationDaily>(
        dataSeries,
        'averageSnowDepthForDate',
      ),
    };
  });

  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-line',
      height: 400,
      type: 'line',
      fontFamily: 'Avenir',
    },
    xaxis: {
      categories: dates,
      type: 'datetime',
      labels: {
        formatter: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    stroke: {
      curve: 'stepline',
    },
  };

  const state: State = {
    options: chartOptions,
    series: seriez,
  };

  return (
    <div>
      <h1>Snow Depth</h1>

      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} />
      </div>
    </div>
  );
};

export default Chart;
