import { css } from "@emotion/css";

import Cell from "./Cell";
import { State } from "../state/reducer";

type GridProps = {
  grid: State["grid"];
  onClick: (x: number, y: number) => void;
};

const Grid = ({ grid, onClick }: GridProps) => {
  return (
    <div
      data-testid="grid"
      className={css`
        display: inline-block;
      `}
    >
      <div
        className={css`
          background-color: #444;
          display: grid;
          grid-template-rows: repeat(${grid.length}, 1fr);
          grid-template-columns: repeat(${grid[0].length}, 1fr);
          grid-gap: 2px;
        `}
      >
        {grid.map((row, rowIndex) =>
          row.map((column, colIndex) => (
            <Cell
              key={`${colIndex}-${rowIndex}`}
              value={column}
              onClick={() => onClick(colIndex, rowIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
