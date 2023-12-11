import { render } from "@testing-library/react";
import App from "./App";
import { describe, expect, test } from "vitest";

describe("<App />", () => {
  test("renders title of the game", () => {
    const { getByText } = render(<App />);

    const linkElement = getByText(/Tic Tac Toe/i);

    expect(linkElement).toBeInTheDocument();
  });
});
