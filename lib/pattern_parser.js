export default patternCode => {
  const grid = [[]];
  let previousCount = 1;

  let match, lastRow;
  while (true) {
    let loopBreak = false;
    match = patternCode.match(/(\d+)|b|o|\$|\!/)[0];
    lastRow = grid[grid.length - 1];

    switch (match) {
      case 'o':
        lastRow.pushAll(Array(previousCount).fill(1));
        previousCount = 1;
        break;
      case 'b':
        lastRow.pushAll(Array(previousCount).fill(0));
        previousCount = 1;
        break;
      case '$':
        for (let i = 0; i < previousCount - 1; i++) {
          grid.push(Array(grid[0].length).fill(0));
        }
        grid.push([]);
        previousCount = 1;
        break;
      case '!':
        loopBreak = true;
        break;
      default:
        previousCount = parseInt(match);
        break;
    }

    if (loopBreak) { break; }
    patternCode = patternCode.slice(match.length);
  }

  return grid;
};
