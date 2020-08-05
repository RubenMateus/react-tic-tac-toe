import React from 'react';
import { render } from '@testing-library/react';
import Game from '../Game';

describe('<Grid />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<Game />);

    expect(asFragment()).toMatchSnapshot();
  });
});
