import React from 'react';

import styled from '@emotion/styled';
import Chart from '../components/chart';
import { RouteComponentProps } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div``;

export const Home = (props: RouteComponentProps) => {
  console.log('HOME PROPS:', props);

  props.history.listen((location, action) => {
    // location is an object like window.location
    console.log('ROUTE CHANGE?', action, location.pathname, location.state);
  });

  const qp = new URLSearchParams(props.location.search);

  const parsed = parseQueryParams(qp);

  console.log('PARSED:', parsed);

  return (
    <StyledHome>
      <div className="bg-blue-800 p-2 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Snow Depth</h3>
      </div>

      <div className="p-4">
        <Chart locations={parsed.query}></Chart>
      </div>
    </StyledHome>
  );
};

export default Home;

function parseQueryParams(queryParams: URLSearchParams): any {
  const p = {};

  queryParams.forEach((value, key) => {
    p[key] = value;
  });

  return p;
}
