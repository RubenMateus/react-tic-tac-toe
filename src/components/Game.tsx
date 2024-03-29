import { useReducer } from "react";
import { css } from "@emotion/css";

import Grid from "./Grid";

import { reducer, getInitialState } from "../state/reducer";

const Game = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { grid, status, turn } = state;

  const handleClick = (x: number, y: number) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div
      className={css`
        display: inline-block;
      `}
    >
      <div
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>Next Turn : {turn}</div>
        <div data-testid="status">
          {status === "success" ? `${turn} won!` : null}
        </div>
        <button onClick={reset} type="button" name="reset">
          Reset
        </button>
      </div>
      <Grid grid={grid} onClick={handleClick} />
    </div>
  );
};

export default Game;
