import React from 'react';
import { render } from '@testing-library/react';

import Autocomplete from './autocomplete';

describe(' Autocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Autocomplete />);
    expect(baseElement).toBeTruthy();
  });
});
