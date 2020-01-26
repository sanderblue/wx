import React, { useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_OBSERVATIONS } from '../graphql/queries';
import ChartNew from '../components/chart-new';
import Checkboxes from '../components/checkboxes';
import { buildQuery } from '../utils';

export interface LocationProps extends RouteComponentProps {}

export const Location = (props: LocationProps) => {
  console.log('PARENT LocationComponent:', props);

  const { history } = props;

  const { id } = useParams();
  const [state, setState] = useState({
    selected: {},
  });

  const { loading, error, data } = useQuery(GET_OBSERVATIONS, {
    variables: {
      locations: [id],
    },
  });

  // console.log('useParams:', id);
  // console.log('useLocation:', search);
  // console.log('DATA:', data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const years = {};

  if (data.observations) {
    const groupByYear = data.observations.filter((d) => {
      const year = new Date(d.date).getFullYear();
      years[year] = false;

      if (new Date(d.date).getFullYear() === 2014) {
        // console.log('2014: ', d.date);
      }
    });
  }

  const yrs = Object.keys(years);

  // console.log('Years: ', yrs);
  // console.log('State:', state);

  function onChangeCheckbox(s) {
    console.log('PARENT s:', s);

    state.selected = s;

    console.log('PARENT State:', state);

    const selectedYears = [];

    for (const [key, checked] of Object.entries(state.selected)) {
      if (checked) {
        selectedYears.push(key);
      }
    }

    console.log('PARENT selectedYears:', selectedYears);

    const query = buildQuery({
      query: selectedYears,
    });

    console.log('PARENT query:', decodeURIComponent(query.toString()));

    history.push(`?${decodeURIComponent(query.toString())}`);
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
                  keyValueMap={years}
                  onChangeCheckbox={onChangeCheckbox}
                ></Checkboxes>
              </div>
            </form>
          </div>
          <div className="w-full h-400 md:h-600">
            <ChartNew chartOptions={{}} series={[]}></ChartNew>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
