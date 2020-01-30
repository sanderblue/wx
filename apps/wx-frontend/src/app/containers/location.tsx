import React, { useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { ApexOptions } from 'apexcharts';
import { GET_OBSERVATIONS } from '../graphql/queries';
import {
  buildQuery,
  generateDatesBetween,
  updateYearsQuery,
  parseQueryString,
  parseQueryParams,
  getQuery,
} from '../utils';
import {
  generateSeasonsData,
  concatSeries,
} from '../components/chart-data.service';
import ChartNew from '../components/chart-new';
import Checkboxes from '../components/checkboxes';
import { MapStringBoolean } from '@wx/shared/data';
import { Autocomplete } from '@wx/ui';

const initialYearsState = {
  '2014': false,
  '2015': false,
  '2016': false,
  '2017': false,
  '2018': false,
  '2019': false,
};

export interface LocationProps extends RouteComponentProps {}

export const Location = (props: LocationProps) => {
  const { history, location } = props;
  const { id } = useParams();

  const yrs = getQuery<string[]>(location.search, []);
  const initialState = yrs.reduce<MapStringBoolean>((acc, yr) => {
    acc[yr] = true;
    return acc;
  }, {});

  console.log('Query:', yrs);
  console.log('State:', initialState);

  const [state, setState] = useState({
    selected: {
      ...initialYearsState,
      ...initialState,
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

  function onSelectSearchResult() {}

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
          <form className="w-full">
            <div className="flex items-center mb-6 justify-between">
              <div className="w-108">
                <h1 className="w-full text-2xl">{id}</h1>
              </div>
              <Checkboxes
                keyValueMap={state.selected}
                onChangeCheckbox={onChangeCheckbox}
              ></Checkboxes>
            </div>
          </form>
          <div className="w-full h-400 md:h-600">
            <ChartNew chartOptions={chartOptions} series={series}></ChartNew>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
