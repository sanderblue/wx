import React from 'react';
import Chart from '../components/chart';
import { RouteComponentProps } from 'react-router-dom';
import { parseQueryString } from '../utils';

export interface HomeProps extends RouteComponentProps {
  onClickRemoveLocation?: Function;
}

export const Home = (props: HomeProps) => {
  console.log('HOME::props:', props);

  const { onClickRemoveLocation } = props;

  const state = parseQueryString(props.location.search);

  return (
    <section>
      <div>
        <div className="flex justify-center p-4">
          <div
            id="chart"
            className="min-h-6 w-full max-h-4 md:max-h-7 lg:max-w-5xl"
          >
            <h1 className="w-full max-w-5xl">Snow Depth</h1>
            <div className="w-full h-400 md:h-600">
              <Chart
                locations={state.locations}
                startDate={state.startDate}
                endDate={state.endDate}
              ></Chart>
            </div>
            <div className="overflow-hidden">
              <ul className="list-reset flex text-sm text-white shadow overflow-x-scroll">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
