import React from 'react';
import { render } from '@testing-library/react';
import AnyHotPass from './AnyHotPass';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/',
    search: '?google.com',
  }),
}));

test('AnyHotPass render matches snapshot', () => {
  const { asFragment } = render(<AnyHotPass />);
  expect(asFragment()).toMatchSnapshot();
});
