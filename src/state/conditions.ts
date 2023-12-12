const checkTree = (a: string | null, b: string | null, c: string | null) => {
  if (!a || !b || !c) {
    return false;
  }

  return a === b && b === c;
};

const checkForWin = (flatGrid: (string | null)[]) => {
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
};

const checkForDraw = (flatGrid: (string | null)[]) =>
  !checkForWin(flatGrid) && flatGrid.filter(Boolean).length === flatGrid.length;

export { checkForWin, checkForDraw };
