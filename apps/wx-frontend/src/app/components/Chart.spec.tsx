import React from 'react';
import { render } from '@testing-library/react';

import Chart from './Chart';

describe(' Chart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Chart />);
    expect(baseElement).toBeTruthy();
  });
});
