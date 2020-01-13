import React, { FormEvent, useState } from 'react';
import Autocomplete from './autocomplete';
import { WxStation } from '@wx/shared/data';

export interface NavProps {
  onSelectSearchResult?: Function;
  updateAppState?: Function;
}

export const Nav = (props: NavProps) => {
  const { updateAppState } = props;

  const [state, setState] = useState({
    location: '',
    startDate: '',
    endDate: '',
  });

  function onSelectSearchResult(result: WxStation) {
    setState({
      ...state,
      location: result.location,
    });
  }

  function onChangeStartDate(event) {
    setState({
      ...state,
      startDate: event.target.value,
    });
  }

  function onChangeEndDate(event) {
    setState({
      ...state,
      endDate: event.target.value,
    });
  }

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log('SUBMIT:', state);

    updateAppState(state);
  }

  return (
    <nav className="bg-gray-900 p-3 text-white">
      <form onSubmit={onSubmitForm} className="flex justify-between">
        <div className="mr-4 w-108 relative">
          <Autocomplete onSelectResult={onSelectSearchResult}></Autocomplete>
        </div>
        <div className="mr-2">
          <input
            value={state.startDate}
            onChange={onChangeStartDate}
            placeholder="Start Date (YYYY-MM-DD)"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 appearance-none leading-normal"
          />
        </div>
        <div className="mr-2">
          <input
            value={state.endDate}
            onChange={onChangeEndDate}
            placeholder="End Date (YYYY-MM-DD)"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 appearance-none leading-normal"
          />
        </div>
        <div className="mr-2 last:mr-0">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded">
            Go
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Nav;
