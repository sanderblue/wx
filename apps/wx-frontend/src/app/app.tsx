import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Chart from './components/chart';

// Styles
import '../assets/styles.css';

const client = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <main>
        <Chart></Chart>
      </main>
    </ApolloProvider>
  );
};

export default App;
