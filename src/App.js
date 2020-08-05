import React, { useReducer } from 'react';
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

const clone = x => JSON.parse(JSON.stringify(x));

function generateGrid(rows, columns, mapper) {
  return Array(rows).fill().map(() => Array(columns).fill().map(mapper));
}

const grid = () => generateGrid(3,3,() => null);

function checkTree(a,b,c) {
  if(!a || !b || !c) {
    return false;
  }

  return a === b && b === c;
}

function checkForWin(flatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  return (
    checkTree(nw, n, ne) ||
    checkTree(w, c, e) ||
    checkTree(sw, s, se) ||
    checkTree(nw, w, sw) ||
    checkTree(n, c, s) ||
    checkTree(ne, e, se) ||
    checkTree(nw, c, se) ||
    checkTree(ne, c, sw)
  );
}

function checkForDraw(flatGrid) {
  return !checkForWin(flatGrid) && flatGrid.filter(Boolean).length === flatGrid.length;
}

const NEXT_TURN = {
  O : 'X',
  X : 'O'
}

const getInitialState = () => ({
  grid: grid(),
  turn: 'X',
  status: 'inProgress'
});

const reducer = (state, action) => {
  if(state.status === 'success' && action.type !== 'RESET') {
    return state;
  }

  switch(action.type){
    case 'RESET':
      return getInitialState();
    case 'CLICK': {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if(grid[y][x]){
        return state;
      }

      console.log(state);

      const nextState = clone(state);

      nextState.grid[y][x] = turn;

      const flatGrid = nextState.grid.flat();

      if(checkForWin(flatGrid)) {
        nextState.status = 'success';
        return nextState;
      }
      if(checkForDraw(flatGrid)){
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }

    default:
      return state;
  }
}

function Game() {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y }});
  };

  const reset = () => {
    dispatch({ type: 'RESET'});
  }

  return (
    <div className={css`
      display: inline-block;

    `}>
      <div className={css`
        display: flex;
        justify-content: space-between;
      `}>
        <div>
          Next Turn : {turn}
        </div>
        <div>
          { status === 'success' ? `${turn} won!` : null}
        </div>
        <button onClick={reset} type="button">
          Reset
        </button>
      </div>
      <Grid grid={grid} onClick={handleClick}/>
    </div>
  )
}

function Grid({grid, onClick}){
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
            <Cell key={`${colIndex}-${rowIndex}`} value={column} onClick={() => onClick(colIndex, rowIndex)}/>
        ))}
      </div>
    </div>
  )
}

function Cell({value, onClick}){
  return <div className={css`
    background-color: #fff;
    width: 100px;
    height: 100px;
    `}
  >
    <button type="button" onClick={onClick} className={css`
      width: 100%;
      height: 100%;
    `}>{value}</button>
  </div>
}

export default App;
