import React from 'react';

import styled from '@emotion/styled';
import Chart from '../components/chart';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div``;

export const Home = (props: HomeProps) => {
  return (
    <StyledHome>
      <div className="bg-blue-800 p-2 shadow text-xl text-white">
        <h3 className="font-bold pl-2">Snow Depth</h3>
      </div>

      <div className="p-4">
        <Chart></Chart>
      </div>
    </StyledHome>
  );
};

export default Home;
