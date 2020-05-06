import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App render matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
