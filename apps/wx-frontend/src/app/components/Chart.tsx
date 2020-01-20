import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import values from 'lodash/values';
import { ApexOptions } from 'apexcharts';
import { useQuery } from '@apollo/react-hooks';

import { generateSeries } from './chart-data.service';
import { GET_OBSERVATIONS } from '../graphql/queries';
import { locationColorMap } from '@wx/shared/data';

const NoData = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.25em;
`;

interface State {
  options: ApexOptions;
  series: ApexAxisChartSeries;
}

interface ChartProps {
  locations: string[];
  startDate: string;
  endDate: string;
}

/**
 * Component
 */
export const Chart = (props: ChartProps) => {
  console.log('Chart::props', props);

  const { startDate, endDate } = props;

  const locations = props.locations || [];
  const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      locations,
    },
  });

  // console.log('DATA:', data);
  if (!locations.length) {
    return <NoData>Search for locations to display data.</NoData>;
  }

  if (loading) {
    return <NoData>Loading...</NoData>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const obs: any[] = data ? data.observations : [];

  const { series, xAxisLabels } = generateSeries(
    locations,
    startDate,
    endDate,
    obs,
  );

  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-line',
      height: '500px',
      type: 'line',
      fontFamily: 'Avenir',
    },
    colors: values(locationColorMap),
    xaxis: {
      categories: xAxisLabels,
      type: 'datetime',
      labels: {
        formatter: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    yaxis: {
      tickAmount: 10,
      labels: {
        align: 'left',
        // offsetX: 100,
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

  console.log('CHART state:', state);

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      height="100%"
      width="100%"
    />
  );
};

export default Chart;
