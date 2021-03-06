import React, { FormEvent, useState } from 'react';
import moment from 'moment';
import Autocomplete from './autocomplete';
import { WxStation } from '@wx/shared/data';

export interface NavProps {
  onSelectSearchResult?: Function;
  updateAppState?: Function;
}

export const Nav = (props: NavProps) => {
  const { updateAppState } = props;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const defaultStartYear = currentYear; // - 1;
  const defaultStartDate = `${defaultStartYear}-9-01`;
  const defaultEndDate = moment().format('YYYY-MM-DD');

  const [state, setState] = useState({
    location: '',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  function onSelectSearchResult(result: WxStation) {
    const updatedState = {
      ...state,
      location: result.location,
    };

    setState(updatedState);

    if (state.startDate && state.endDate) {
      updateAppState(updatedState);
    }
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

    updateAppState(state);
  }

  return (
    <nav className="bg-gray-900 p-3 text-white">
      <form
        className="flex justify-between lg:justify-center"
        onSubmit={onSubmitForm}
      >
        <div className="mr-4 lg:mr-8 w-108 lg:w-112 relative">
          <label className="block text-gray-500 text-xs font-bold">
            Search
          </label>
          <Autocomplete onSelectResult={onSelectSearchResult}></Autocomplete>
        </div>
        <div className="mr-2 lg:mr-8">
          <label className="block text-gray-500 text-xs font-bold">
            Start Date
          </label>
          <input
            onChange={onChangeStartDate}
            defaultValue={defaultStartDate}
            placeholder="YYYY-MM-DD"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 appearance-none leading-normal"
          />
        </div>
        <div className="mr-2 lg:mr-8">
          <label className="block text-gray-500 text-xs font-bold">
            End Date
          </label>
          <input
            defaultValue={defaultEndDate}
            onChange={onChangeEndDate}
            placeholder="YYYY-MM-DD"
            className="w-full py-1 px-2 bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded appearance-none leading-normal"
          />
        </div>
        <div className="flex mr-2 last:mr-0">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 lg:px-8 rounded self-end">
            Go
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Nav;
