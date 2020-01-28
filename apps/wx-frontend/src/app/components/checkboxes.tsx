import React, { useState } from 'react';
import { MapStringBoolean } from '@wx/shared/data';

interface CheckboxesProps {
  keyValueMap: MapStringBoolean;
  onChangeCheckbox: Function;
}

export const Checkboxes = (props: CheckboxesProps) => {
  const { keyValueMap, onChangeCheckbox } = props;

  const [state, setState] = useState({
    ...keyValueMap,
  });

  function onChangeSelected(item) {
    const s = state;
    s[item] = !state[item];

    setState({ ...state, ...s });

    onChangeCheckbox(s);
  }

  return (
    <div>
      {Object.keys(keyValueMap).map((item, i) => {
        return (
          <label key={i} className="mr-4">
            <input
              type="checkbox"
              checked={state[item]}
              onChange={() => onChangeSelected(item)}
            />
            <span className="text-sm">{item}</span>
          </label>
        );
      })}
    </div>
  );
};

export default Checkboxes;
