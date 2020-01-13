import React from 'react';
import Autocomplete from './autocomplete';

export interface NavProps {
  onSelectSearchResult?: Function;
}

export const Nav = (props: NavProps) => {
  const { onSelectSearchResult } = props;

  return (
    <nav className="bg-gray-900 p-3 text-white">
      <div className="flex justify-between">
        <div className="mr-4 w-108 relative">
          <Autocomplete onSelectResult={onSelectSearchResult}></Autocomplete>
        </div>
        <div className="mr-4">
          <input
            placeholder="Start Date (YYYY-MM-DD)"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 appearance-none leading-normal"
          />
        </div>
        <div className="mr-4 last:mr-0">
          <input
            placeholder="End Date (YYYY-MM-DD)"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 appearance-none leading-normal"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
