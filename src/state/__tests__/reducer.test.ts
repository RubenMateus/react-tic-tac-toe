import { reducer } from "../reducer";
import { generateGrid } from "../../utils";
import { checkForWin, checkForDraw } from "../conditions";
import { vi, describe, expect, test } from "vitest";

vi.mock("../conditions");

describe("reducer", () => {
  test("should return state when status is success and type is not RESET", () => {
    const state = {
      status: "success" as const,
      grid: [["X"]],
      turn: "O" as const,
    };
    const action = { type: "CLICK" as const, payload: { x: 1, y: 1 } };

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      status: "success",
      grid: [["X"]],
      turn: "O",
    });
  });

  test("should return initialState when type is RESET", () => {
    const state = {
      status: "success" as const,
      grid: [["X"]],
      turn: "O" as const,
    };
    const action = { type: "RESET" as const };

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      grid: generateGrid(3, 3, () => null),
      turn: "X",
      status: "inProgress",
    });
  });

  test("should return state when grid position is filled", () => {
    const state = {
      status: "inProgress" as const,
      turn: "O" as const,
      grid: generateGrid(1, 1, () => "X" as const),
    };

    const action = { type: "CLICK" as const, payload: { x: 0, y: 0 } };

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual(state);
  });

  test("should return state nextState with success when checkForWin is true", () => {
    const state = {
      status: "inProgress" as const,
      turn: "O" as const,
      grid: generateGrid(1, 1, () => null),
    };

    const action = { type: "CLICK" as const, payload: { x: 0, y: 0 } };

    vi.mocked(checkForWin).mockImplementation(() => true);

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result.status).toBe("success");
  });

  test("should return state initialState when checkForDraw is true", () => {
    const state = {
      status: "inProgress" as const,
      turn: "O" as const,
      grid: generateGrid(1, 1, () => null),
    };
    const action = { type: "CLICK" as const, payload: { x: 0, y: 0 } };

    vi.mocked(checkForWin).mockImplementation(() => false);
    vi.mocked(checkForDraw).mockImplementation(() => true);

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      grid: generateGrid(3, 3, () => null),
      turn: "X",
      status: "inProgress",
    });
  });

  test("should return state nextState when winning or draw conditions do not apply", () => {
    const state = {
      status: "inProgress" as const,
      turn: "O" as const,
      grid: generateGrid(1, 1, () => null),
    };
    const action = { type: "CLICK" as const, payload: { x: 0, y: 0 } };

    vi.mocked(checkForWin).mockImplementation(() => false);
    vi.mocked(checkForDraw).mockImplementation(() => false);

    const result = reducer(state, action);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual({
      status: "inProgress",
      turn: "X",
      grid: [["O"]],
    });
  });
});
