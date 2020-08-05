import React from 'react';
import { render } from '@testing-library/react';
import Cell from '../Cell';

describe('<Cell />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Cell onClick={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
