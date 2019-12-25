import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { SnowDepthObservationDaily } from '@wx/shared/data';
import axios, { AxiosResponse } from 'axios';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { Dictionary } from 'lodash';

/* eslint-disable-next-line */
export interface ChartProps {}

const StyledChart = styled.div`
  color: #999;
`;

export default function Chart() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  async function fetchData() {
    const response = await axios.get('https://localhost:3333/api/snow/depth');
    const result = response.data;

    const grouped = groupByLocation(result);
    const dataSet = orderBy(grouped.MtHoodMeadowsBase, ['timestamp'], ['desc']);

    // console.log('dataSeries:', dataSeries);

    const dataSeries = getDataForDateRange(
      dataSet,
      new Date('2019-011-01'),
      new Date(),
    );

    const series = [
      {
        name: 'MtHoodMeadows',
        data: dataSeries.map((o) => o.averageSnowDepthForDate).reverse(),
      },
    ];

    const dates = dataSeries.map((o) => o.date).reverse();

    // console.log('SERIES:', series);

    const state = {
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

    // setData(result);
    setChartOptions(state.options);
    setChartSeries(state.series);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledChart>
      <h1>Welcome to chart component!</h1>

      <div id="chart">
        <ReactApexChart options={chartOptions} series={chartSeries} />
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </StyledChart>
  );
}

function groupByLocation(
  data: SnowDepthObservationDaily[],
): Dictionary<SnowDepthObservationDaily[]> {
  return groupBy(data, 'location');
}

function getDataForDateRange(
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
