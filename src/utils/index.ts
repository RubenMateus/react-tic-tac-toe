export const clone = (x) => JSON.parse(JSON.stringify(x));

export const generateGrid = (rows, columns, mapper) =>
  Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
