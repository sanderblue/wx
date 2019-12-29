import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { SnowDepthObservationDaily } from '@wx/shared/data';
import axios, { AxiosResponse } from 'axios';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { Dictionary } from 'lodash';
import {
  groupByLocation,
  getDataForDateRange,
  getNurmericalSeriesData,
} from './chart-data.service';

interface ObservationLocation {
  location: string;
}

const GET_OBSERVATIONS = gql`
  query getObservations($location: String!) {
    observations(location: $location) {
      location
      date
      averageSnowDepthForDate
    }
  }
`;

interface State {
  options: ApexOptions;
  series: ApexAxisChartSeries;
}

const defaultChartOptions: ApexOptions = {
  chart: {
    height: 400,
  },
  title: {
    text: 'Snow Depth',
    align: 'center',
  },
  xaxis: {
    type: 'datetime',
    categories: [],
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  plotOptions: {},
};

const defaultState: State = {
  options: defaultChartOptions,
  series: [],
};

const StyledChart = styled.div`
  color: #999;
`;

const locations = ['mt-hood', 'crystal', 'mt-baker-ski-area'];

export default function Chart() {
  // const [chartOptions, setChartOptions] = useState({});
  // const [chartSeries, setChartSeries] = useState([]);
  const { data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      location: 'MtHoodMeadowsBase',
    },
  });

  console.log('DATA:', data);

  const [state, setState] = useState<any>(data ? defaultState : false);

  let dataSeries = [];
  let series = [];
  let dates = [];

  const dataSet = orderBy(data, ['date'], ['desc']);

  dataSeries = getDataForDateRange(
    dataSet,
    new Date('2019-011-01'),
    new Date(),
  );

  series = [
    {
      name: 'MtHoodMeadows',
      data: getNurmericalSeriesData<SnowDepthObservationDaily>(
        dataSeries,
        'averageSnowDepthForDate',
      ),
    },
  ];

  dates = dataSeries.map((o) => o.date).reverse();

  const localState: State = {
    options: {
      chart: {
        height: 400,
        type: 'line',
      },
      title: {
        text: 'Snow Depth',
        align: 'center',
      },
      xaxis: {
        type: 'datetime',
        categories: dates,
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      plotOptions: {},
    },
    series,
  };

  setState(localState);

  async function fetchData() {
    // const response = await axios.get('https://localhost:3333/api/snow/depth');
    // const { loading, data } = useQuery<any, ObservationLocation>(
    //   GET_OBSERVATIONS,
    //   { variables: { location: 'MtHoodMeadowsBase' } },
    // );
    // console.log('DATA:', data);
    // const response = await axios.post('https://localhost:3333/api/snow/depth');
    // const result = response.data;
    // const grouped = groupByLocation(result);
    // const dataSet = orderBy(grouped.MtHoodMeadowsBase, ['timestamp'], ['desc']);
    // const dataSeries = getDataForDateRange(
    //   dataSet,
    //   new Date('2019-011-01'),
    //   new Date(),
    // );
    // const series = [
    //   {
    //     name: 'MtHoodMeadows',
    //     data: getNurmericalSeriesData<SnowDepthObservationDaily>(
    //       dataSeries,
    //       'averageSnowDepthForDate',
    //     ),
    //   },
    // ];
    // const dates = dataSeries.map((o) => o.date).reverse();
    // // console.log('SERIES:', series);
    // const state = {
    //   options: {
    //     chart: {
    //       height: 400,
    //       type: 'line',
    //     },
    //     title: {
    //       text: 'Snow Depth',
    //       align: 'center',
    //     },
    //     xaxis: {
    //       type: 'datetime',
    //       categories: dates,
    //     },
    //     yaxis: {
    //       tooltip: {
    //         enabled: true,
    //       },
    //     },
    //     plotOptions: {},
    //   },
    //   series,
    // };
    // setChartOptions(state.options);
    // setChartSeries(state.series);
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <StyledChart>
      <h1>Welcome to chart component!</h1>

      <div id="chart">
        <ReactApexChart
          options={data ? state.options : {}}
          series={data ? state.series : []}
        />
      </div>
    </StyledChart>
  );
}
