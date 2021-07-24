import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  test('renders correctly', () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders title of the game', () => {
    const { getByText } = render(<App />);

    const linkElement = getByText(/Tic Tac Toe/i);

    expect(linkElement).toBeInTheDocument();
  });
});
