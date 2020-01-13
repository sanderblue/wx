// Styles
import '../assets/styles.css';

import React from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Sidebar from './components/sidebar';
import Home from './containers/home';
import { Nav } from '@wx/ui';
import { addLocationToQuery, removeLocationFromQuery } from './utils';
import { apolloClient } from './components/graphql-client';
import { WxStation } from '@wx/shared/data';

export const App = (props: RouteComponentProps) => {
  const { history } = props;

  function updateState(d: WxStation) {
    const queryParams = addLocationToQuery(d.location);
    history.push(`?${queryParams.toString()}`);
  }

  function removeLocation(l: string) {
    const qp = removeLocationFromQuery(props.location.search, l);
    const result = qp.toString();

    if (!result) {
      return history.push(``);
    }

    history.push(`?${qp.toString()}`);
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Nav onSelectSearchResult={updateState}></Nav>

      <div className="flex flex-col">
        <main className="main-content flex-1 bg-gray-100">
          <Route
            path="/"
            render={(props) => (
              <Home {...props} onClickRemoveLocation={removeLocation} />
            )}
          />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default withRouter(App);
