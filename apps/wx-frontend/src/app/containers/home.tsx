import React from 'react';
import Chart from '../components/chart';
import { RouteComponentProps } from 'react-router-dom';
import { parseQueryParams, parseJSON } from '../utils';
import remove from 'lodash/remove';

export interface HomeProps extends RouteComponentProps {
  onClickRemoveLocation?: Function;
}

export const Home = (props: HomeProps) => {
  const parsed = parseQueryParams(new URLSearchParams(props.location.search));

  console.log('HOME::props:', props);

  const locations = parseJSON<string[]>(parsed.query, []);

  return (
    <section>
      <div className="bg-blue-800 p-3 shadow text-white">
        <ul className="list-reset flex text-sm min-h-2">
          {locations.map((location, i) => {
            return (
              <li
                className="mr-3 bg-gray-600 rounded py-1 px-2 text-blue"
                key={i}
              >
                <span className="inline-block mr-2">{location}</span>
                <svg
                  className="fill-current inline-block h-4 w-4"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  onClick={() => props.onClickRemoveLocation(location)}
                >
                  <title>Remove Location</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4">
        <Chart locations={locations}></Chart>
      </div>
    </section>
  );
};

export default Home;
