import React from 'react';
import { css } from '@emotion/css';
import PropTypes from 'prop-types';

import Cell from './Cell';

const Grid = ({ grid, onClick }) => {
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

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Grid;
