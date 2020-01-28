import React, { useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { ApexOptions } from 'apexcharts';
import { GET_OBSERVATIONS } from '../graphql/queries';
import { buildQuery, generateDatesBetween, updateYearsQuery } from '../utils';
import {
  generateSeasonsData,
  concatSeries,
} from '../components/chart-data.service';
import ChartNew from '../components/chart-new';
import Checkboxes from '../components/checkboxes';

export interface LocationProps extends RouteComponentProps {}

export const Location = (props: LocationProps) => {
  const { history } = props;
  const { id } = useParams();
  const [state, setState] = useState({
    selected: {
      '2014': false,
      '2015': false,
      '2016': false,
      '2017': false,
      '2018': true,
      '2019': true,
    },
  });

  const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      locations: [id],
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const dateRange = generateDatesBetween(
    new Date('2018-10-02'),
    new Date('2019-06-02'),
  );

  const seasons = generateSeasonsData(
    state.selected,
    data.observations,
    dateRange.length,
  );

  const series = concatSeries(state.selected, seasons);

  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-line',
      height: '500px',
      type: 'line',
      fontFamily: 'Avenir',
    },
    xaxis: {
      type: 'category',
      categories: dateRange,
      tickAmount: 20,
    },
    yaxis: {
      tickAmount: 10,
      labels: {
        align: 'left',
      },
    },
    stroke: {
      curve: 'stepline',
    },
    tooltip: {
      shared: true,
    },
  };

  function onChangeCheckbox(s) {
    state.selected = s;

    const query = buildQuery({
      query: updateYearsQuery(state.selected),
    });

    history.push(`?${decodeURIComponent(query.toString())}`);

    setState({
      ...state,
    });
  }

  return (
    <section>
      <div className="flex justify-center p-4">
        <div
          id="chart"
          className="min-h-6 w-full max-h-4 md:max-h-7 lg:max-w-5xl"
        >
          <h1 className="w-full max-w-5xl">{id}</h1>
          <div>
            <form className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <Checkboxes
                  keyValueMap={state.selected}
                  onChangeCheckbox={onChangeCheckbox}
                ></Checkboxes>
              </div>
            </form>
          </div>
          <div className="w-full h-400 md:h-600">
            <ChartNew chartOptions={chartOptions} series={series}></ChartNew>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
