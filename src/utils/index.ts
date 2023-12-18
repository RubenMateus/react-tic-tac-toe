export const clone = (x: unknown) => JSON.parse(JSON.stringify(x));

export const generateGrid = (
  rows: number,
  columns: number,
  mapper: () => null | "X" | "O"
) =>
  Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(null).map(mapper));
