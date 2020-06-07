import React from 'react';
import { Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Home } from './containers/home';
import { Nav } from '@wx/ui';
import {
  removeLocationFromQuery,
  getLocationsFromQueryString,
  buildQueryParams,
} from './utils';
import { apolloClient } from './components/graphql-client';
import { AppState } from '@wx/shared/data';

// Styles
import '../assets/styles.css';

export const App = (props: RouteComponentProps) => {
  const { history, location } = props;

  function updateAppState(state: AppState) {
    const locations = getLocationsFromQueryString(location.search);

    if (state.location && !locations.includes(state.location)) {
      locations.push(state.location);
    }

    const appState: AppState = {
      ...state,
      locations,
    };

    console.log('App::updateAppState:', appState);

    const qp = buildQueryParams({
      locations: appState.locations,
      startDate: appState.startDate,
      endDate: appState.endDate,
    });

    history.push(`?${qp.toString()}`);
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
      <Nav updateAppState={updateAppState}></Nav>

      <div className="flex flex-col min-h-full">
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
