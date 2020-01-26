import React from 'react';
import { render } from '@testing-library/react';

import Location from './location';

describe(' Location', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Location />);
    expect(baseElement).toBeTruthy();
  });
});
