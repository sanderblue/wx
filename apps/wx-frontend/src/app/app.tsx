import React from 'react';

import styled from '@emotion/styled';
import Chart from './components/Chart';

const StyledApp = styled.div`
  font-family: Avenir, sans-serif;
  min-width: 300px;
  max-width: 960px;
  margin: 50px auto;

  main {
    padding: 0 36px;
  }
`;

export const App = () => {
  return (
    <StyledApp>
      <main>
        <Chart></Chart>
      </main>
    </StyledApp>
  );
};

export default App;
