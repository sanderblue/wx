import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import orderBy from 'lodash/orderBy';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  getDataForDateRange,
  getNurmericalSeriesData,
} from './chart-data.service';
import { SnowDepthObservationDaily } from '@wx/shared/data';

const SnowChart = styled.div`
  color: #888;
`;

const GET_OBSERVATIONS = gql`
  query getObservations($location: String!) {
    observations(location: $location) {
      location
      date
      averageSnowDepthForDate
    }
  }
`;

export const Chart = () => {
  const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      location: 'MtHoodMeadowsBase',
    },
  });

  console.log('DATA:', data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const obs: any[] = data ? data.observations : [];
  const dataSet = orderBy(obs, ['date'], ['desc']);
  const dataSeries = getDataForDateRange(
    dataSet,
    new Date('2019-011-01'),
    new Date(),
  );
  const dates = dataSeries.map((o) => o.date).reverse();

  console.log('dataSeries:', dataSeries);

  const series = [
    {
      name: 'MtHoodMeadows',
      data: getNurmericalSeriesData<SnowDepthObservationDaily>(
        dataSeries,
        'averageSnowDepthForDate',
      ),
    },
  ];

  const chartOptions = {
    options: {
      chart: {
        id: 'basic-line',
        height: 400,
        type: 'line',
      },
      xaxis: {
        categories: dates,
      },
    },
    series,
  };

  return (
    <div>
      <SnowChart>
        <h1>Welcome to chart component!</h1>

        <div id="chart">
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
          />
        </div>
      </SnowChart>
    </div>
  );
};

export default Chart;
