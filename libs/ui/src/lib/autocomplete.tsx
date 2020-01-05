import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const StyledAutoComplete = styled.div``;
const StyledIcon = styled.div`
  top: 0.5rem;
  left: 0.8rem;
`;

export const GET_WEATHER_STATIONS = gql`
  query getWeatherStations($l: [Object!]!) {
    weatherStations {
      location
    }
  }
`;

interface Store {
  items: any[];
  locations: string[];
}

// Store for cached location selections
const store: Store = {
  items: [],
  locations: [],
};

export const Autocomplete = (props: RouteComponentProps) => {
  const [state, setState] = useState({
    items: [],
  });

  const { loading, error, data } = useQuery(GET_WEATHER_STATIONS);

  console.log('DATA:', data);

  function onKeyUp(event: any) {
    setState({
      items: [],
      // locations.filter((item) =>
      //   item.label.includes(event.target.value),
      // ),
    });
  }

  function onClickItem(item: any) {
    store.items = [...store.items, item];

    if (!store.locations.includes(item.value)) {
      store.locations.push(item.value);
    }

    setState({
      items: [],
    });

    let queryP = new URLSearchParams(window.location.search);
    queryP.set('query', JSON.stringify(store.locations));

    props.history.push(`?${queryP.toString()}`, { state: 'test' });
  }

  // https://github.com/sindresorhus/query-string
  function updateQueryParams(locations: string[]) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    console.log('');
    console.log('URL:                  ', url);
    console.log('SEARCH PARAMS:        ', params);

    params.set('locations', JSON.stringify(locations));

    console.log('SEARCH PARAMS UPDATED:', params);
    console.log('');
  }

  return (
    <StyledAutoComplete>
      <input
        type="search"
        placeholder="Search"
        className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
        onKeyUp={onKeyUp}
      />
      <StyledIcon className="absolute search-icon">
        <svg
          className="fill-current pointer-events-none text-white w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </StyledIcon>
      {state.items.length > 0 && (
        <ul className="absolute w-full bg-gray-800 border-gray-700 rounded">
          {state.items.map((item, index) => {
            const c = index === state.items.length - 1 ? true : false;

            return (
              <li
                key={index}
                className="cursor-pointer last:border-b-0 hover:bg-gray-700"
                onClick={() => onClickItem(item)}
              >
                <div
                  className={
                    c ? 'mx-2 p-2' : 'mx-2 p-2 border-b border-gray-700'
                  }
                >
                  {item.label}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </StyledAutoComplete>
  );
};

export default withRouter(Autocomplete);
