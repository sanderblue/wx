import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Chart from './components/chart';
import { Nav } from '@wx/ui';

// Styles
import '../assets/styles.css';
import Sidebar from './components/sidebar';
import Home from './containers/home';

const client = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(window.location.search);
}

window.onhashchange = function() {
  console.log('onhashchange:');
};

export const App = () => {
  const q = useQuery();

  console.log('App::useQuery():', q);

  return (
    <ApolloProvider client={client}>
      <Nav></Nav>
      <div className="flex flex-col md:flex-row">
        <Sidebar></Sidebar>

        <main className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <Route path="/" exact component={Home} />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
