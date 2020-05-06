import React from 'react';
import { render } from '@testing-library/react';
import AnyHotPass from './AnyHotPass';

test('AnyHotPass render matches snapshot', () => {
  const { asFragment } = render(<AnyHotPass />);
  expect(asFragment()).toMatchSnapshot();
});
