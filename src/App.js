import React from 'react';
import { css } from 'emotion'

const App = () => {
  return (
    <div>
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <Game />
    </div>
  )
}

function generateGrid(rows, columns, mapper) {
  return Array(rows).fill().map(() => Array(columns).fill().map(mapper));
}

const grid = generateGrid(3,3,() => null);

function Game() {
  return <div><Grid grid={grid}/></div>
}

function Grid({grid}){
  return (
    <div className={css`display: inline-block`}>
      <div className={css`
        background-color: #444;
        display:grid;
        grid-template-rows: repeat(${grid.length}, 1fr);
        grid-template-columns: repeat(${grid[0].length}, 1fr);
        grid-gap: 2px;
        `}
      >
        {grid.map((row, rowIndex) => row.map(
          (column, colIndex) =>
            <Cell key={`${colIndex}-${rowIndex}`} value={column} />
        ))}
      </div>
    </div>
  )
}

function Cell({value}){
  return <div className={css`
    background-color: #fff;
    width: 100px;
    height: 100px;
    `
  }>

  </div>
}

export default App;
