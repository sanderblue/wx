import React from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { Nav } from '@wx/ui';

// Styles
import '../assets/styles.css';
import Sidebar from './components/sidebar';
import Home from './containers/home';
import { parseJSON } from './utils';

const client = new ApolloClient({
  uri: 'https://localhost:3333/graphql',
});

function updateQueryParams(data): URLSearchParams {
  const queryP = new URLSearchParams(window.location.search);
  const params = parseJSON(queryP.get('query'), []);

  console.log('updateQueryParams:', params);

  if (!params.includes(data)) {
    params.push(data);
  }

  queryP.set('query', JSON.stringify(params));

  return queryP;
}

export const App = (props: RouteComponentProps) => {
  const { history } = props;

  const updateState = (d: any) => {
    const queryParams = updateQueryParams(d.location);
    history.push(`?${queryParams.toString()}`);
  };

  return (
    <ApolloProvider client={client}>
      <Nav onSelectSearchResult={updateState}></Nav>

      <div className="flex flex-col md:flex-row">
        <Sidebar></Sidebar>

        <main className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <Route path="/" component={Home} />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default withRouter(App);
