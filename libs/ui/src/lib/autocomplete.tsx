import React, { useState } from 'react';
import styled from '@emotion/styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { WxStation, WxStations, GET_WEATHER_STATIONS } from '@wx/shared/data';

const StyledAutoComplete = styled.div``;
const StyledIcon = styled.div`
  top: 0.5rem;
  left: 0.8rem;
`;

interface Store {
  items: WxStation[];
  locations: string[];
}

// Store for cached location selections
const store: Store = {
  items: [],
  locations: [],
};

interface AutocompleteProps extends RouteComponentProps {
  onSelectResult: Function;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { onSelectResult } = props;

  const client = useApolloClient();
  const [state, setState] = useState({
    items: [],
  });

  async function onKeyUp(event: any) {
    const q = event.target.value.trim();

    if (!q) {
      return;
    }

    const results = await client.query<WxStations>({
      query: GET_WEATHER_STATIONS,
      variables: {
        query: q,
      },
    });

    setState({
      items: results.data.weatherStations,
    });
  }

  function onClickItem(item: any) {
    store.items = [...store.items, item];

    if (!store.locations.includes(item.location)) {
      store.locations.push(item.location);
    }

    setState({
      items: [],
    });

    onSelectResult(item);
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
        <ul className="absolute z-10 w-full bg-gray-800 border-gray-700 rounded">
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
                  {item.location}
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
