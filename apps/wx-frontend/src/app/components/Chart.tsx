import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from '@apollo/react-hooks';

import { generateSeries } from './chart-data.service';
import { ApexOptions } from 'apexcharts';
import { GET_OBSERVATIONS } from '../graphql/queries';
import { parseJSON } from '../utils';

interface State {
  options: ApexOptions;
  series: ApexAxisChartSeries;
}

interface Store {
  locations: string[];
  series: ApexAxisChartSeries;
}

interface ChartProps {
  locations: string;
}

const STORE: Store = {
  locations: [],
  series: [],
};

/**
 * Component
 */
export const Chart = (props: ChartProps) => {
  const locations = parseJSON<string[]>(props.locations, STORE.locations);

  console.log('Chart::locations', locations);

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

  const { series, xAxisLabels } = generateSeries(locations, obs);

  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-line',
      height: 400,
      type: 'line',
      fontFamily: 'Avenir',
    },
    xaxis: {
      categories: xAxisLabels,
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
    series,
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
