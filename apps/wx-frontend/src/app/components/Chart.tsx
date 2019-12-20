import React from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ChartProps {}

const StyledChart = styled.div`
  color: pink;
`;

class Chart extends React.Component {
  state: any;

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Average High & Low Temperature',
          align: 'left',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 6,
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'Month',
          },
        },
        yaxis: {
          title: {
            text: 'Temperature',
          },
          min: 5,
          max: 40,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
      series: [
        {
          name: 'High - 2013',
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: 'Low - 2013',
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height="350"
        />
      </div>
    );
  }
}

// export const Chart = (props: ChartProps) => {
//   return (
//     <StyledChart>
//       <h1>Welcome to chart component!</h1>
//     </StyledChart>
//   );
// };

export default Chart;
