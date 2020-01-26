import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartNewProps {
  chartOptions: ApexOptions;
  series: ApexAxisChartSeries;
}

export const ChartNew = (props: ChartNewProps) => {
  return (
    <ReactApexChart
      options={props.chartOptions}
      series={props.series}
      height="100%"
      width="100%"
    />
  );
};

export default ChartNew;
