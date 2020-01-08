import React from 'react';
import styled from '@emotion/styled';
import Chart from '../components/chart';
import { RouteComponentProps } from 'react-router-dom';
import { parseQueryParams } from '../utils';

/* eslint-disable-next-line */
export interface HomeProps {}

export const Home = (props: RouteComponentProps) => {
  const parsed = parseQueryParams(new URLSearchParams(props.location.search));

  console.log('HOME:', parsed);

  return (
    <section>
      <div className="bg-blue-800 p-2 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Snow Depth</h3>
      </div>

      <div className="p-4">
        <Chart locations={parsed.query}></Chart>
      </div>
    </section>
  );
};

export default Home;
