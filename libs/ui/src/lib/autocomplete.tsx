import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { WxStation, WxStations, GET_WEATHER_STATIONS } from '@wx/shared/data';

const StyledIcon = styled.div`
  top: 0.6rem;
  left: 0.5rem;
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

interface AutocompleteProps {
  onSelectResult?: Function;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { onSelectResult } = props;
  let textInput = null;

  useEffect(() => {
    textInput.focus();
  }, []);

  const client = useApolloClient();
  const [state, setState] = useState({
    searchValue: '',
    items: [],
  });

  async function onChangeSearch(event: any) {
    const q = event.target.value.trim();

    // if (!q) {
    //   setState({
    //     ...state,
    //     searchValue: q,
    //     items: [],
    //   });

    //   return;
    // }

    const results = await client.query<WxStations>({
      query: GET_WEATHER_STATIONS,
      variables: {
        query: q,
      },
    });

    setState({
      ...state,
      searchValue: q,
      items: results.data.weatherStations,
    });
  }

  function onClickItem(item: WxStation) {
    store.items = [...store.items, item];

    if (!store.locations.includes(item.location)) {
      store.locations.push(item.location);
    }

    setState({
      ...state,
      searchValue: item.location,
      items: [],
    });

    onSelectResult(item);
  }

  return (
    <div className="relative">
      <input
        type="search"
        placeholder=""
        className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-6 appearance-none leading-normal"
        onChange={onChangeSearch}
        value={state.searchValue}
        ref={(button) => {
          textInput = button;
        }}
      />
      <StyledIcon className="absolute search-icon">
        <svg
          className="fill-current pointer-events-none text-white w-3 h-3"
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
                    c
                      ? 'text-sm mx-2 p-2'
                      : 'text-sm mx-2 p-2 border-b border-gray-700'
                  }
                >
                  {item.location}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
