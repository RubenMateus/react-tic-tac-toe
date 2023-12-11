import { render, fireEvent, screen } from "@testing-library/react";
import Game from "../Game";
import { describe, expect, test } from "vitest";

describe("<Game />", () => {
  test("call reset on button Click", () => {
    render(<Game />);

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByTestId("status").textContent).toBe("");
  });

  test("call onClick on grid", () => {
    render(<Game />);

    fireEvent.click(screen.getByTestId("grid"));

    expect(screen.getByText(/next turn : x/i).textContent).toBeDefined();
  });
});
