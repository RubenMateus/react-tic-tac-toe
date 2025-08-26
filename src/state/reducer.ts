import { clone, generateGrid } from "../utils";
import { checkForWin, checkForDraw } from "./conditions";

const NEXT_TURN = {
  O: "X",
  X: "O",
};

export type State = {
  grid: Array<Array<string | undefined>>;
  status: "inProgress" | "success";
  turn: keyof typeof NEXT_TURN;
};

const getInitialState = (): State => ({
  grid: generateGrid(3, 3, () => null),
  turn: "X",
  status: "inProgress",
});

type Action =
  | {
      type: "CLICK";
      payload: {
        x: number;
        y: number;
      };
    }
  | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }

  switch (action.type) {
    case "RESET":
      return getInitialState();
    case "CLICK": {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }

      const nextState = clone(state);

      nextState.grid[y][x] = turn;

      const flatGrid = nextState.grid.flat();

      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }

    default:
      return state;
  }
};

export { reducer, getInitialState };
