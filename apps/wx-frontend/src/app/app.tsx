import React from 'react';
import styled from '@emotion/styled';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
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

const client = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <StyledApp>
        <main>
          <Chart></Chart>
        </main>
      </StyledApp>
    </ApolloProvider>
  );
};

export default App;
