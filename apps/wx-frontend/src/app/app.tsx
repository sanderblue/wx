import React from 'react';

import styled from '@emotion/styled';
import Chart from './components/Chart';

const StyledApp = styled.div`
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;

  .gutter-left {
    margin-left: 9px;
  }

  .col-span-2 {
    grid-column: span 2;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header {
    background-color: #143055;
    color: white;
    padding: 5px;
    border-radius: 3px;
  }

  main {
    padding: 0 36px;
  }
`;

export const App = () => {
  return (
    <StyledApp>
      <header className="flex">
        <h1>Snow!</h1>
      </header>
      <main>
        <Chart></Chart>
      </main>
    </StyledApp>
  );
};

export default App;
