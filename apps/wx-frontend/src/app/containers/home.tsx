import React from 'react';
import Chart from '../components/chart';
import { RouteComponentProps } from 'react-router-dom';
import { getLocationsFromQueryString, parseQueryString } from '../utils';

export interface HomeProps extends RouteComponentProps {
  onClickRemoveLocation?: Function;
}

export const Home = (props: HomeProps) => {
  console.log('HOME::props:', props);

  const { onClickRemoveLocation } = props;

  // const locations = getLocationsFromQueryString(props.location.search);
  // const startDate = getStartDateFromQueryString(props.location.search);
  // const endDate = getEndDateFromQueryString(props.location.search);

  const state = parseQueryString(props.location.search);

  return (
    <section>
      <div className="p-4">
        <Chart
          locations={state.locations}
          startDate={state.startDate}
          endDate={state.endDate}
        ></Chart>
      </div>
      <div className="p-3 shadow text-white">
        <ul className="list-reset flex text-sm min-h-2">
          {state.locations.map((location, i) => {
            return (
              <li
                className="flex mr-3 bg-gray-600 rounded py-1 px-2 text-blue"
                key={i}
              >
                <span className="self-center mr-2">{location}</span>
                <svg
                  className="self-center fill-current h-4 w-4"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => onClickRemoveLocation(location)}
                >
                  <title>Remove Location</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;
