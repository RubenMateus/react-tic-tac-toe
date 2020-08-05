import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../Grid';
import { generateGrid } from '../../utils';

const emptyGrid = generateGrid(3, 3, () => null);

describe('<Grid />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <Grid grid={emptyGrid} onClick={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
