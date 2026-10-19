const BOARD_SIZE = 10;

export default class GameBoard {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  missedAttacks = [];
  hitAttacks = [];

  isInBounds(arr) {
    return arr[0] >= 0 && arr[0] < BOARD_SIZE && arr[1] >= 0 && arr[1] < BOARD_SIZE;
  }

  validatePlacement(ship, start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    const rowDist = Math.abs(endRow - startRow);
    const colDist = Math.abs(endCol - startCol);

    if (
      !this.isInBounds(start) ||
      !this.isInBounds(end) ||
      (rowDist !== 0 && colDist !== 0) ||
      ship.length !== Math.max(rowDist, colDist) + 1
    ) {
      throw new Error();
    }
  }

  placeShip(ship, start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    this.validatePlacement(ship, start, end);

    const stepRow = Math.sign(endRow - startRow);
    const stepCol = Math.sign(endCol - startCol);

    for (let i = 0; i < ship.length; i++) {
      const row = startRow + i * stepRow;
      const col = startCol + i * stepCol;

      if (this.isShip([row, col])) throw new Error();
    }

    for (let i = 0; i < ship.length; i++) {
      this.board[startRow + i * stepRow][startCol + i * stepCol] = ship;
    }
  }

  isShip(arr) {
    return this.board[arr[0]][arr[1]] !== null;
  }

  receiveAttack(arr) {
    const isSameSquare = ([row, col]) => row === arr[0] && col === arr[1];

    if (
      this.missedAttacks.some(isSameSquare) ||
      this.hitAttacks.some(isSameSquare) ||
      !this.isInBounds(arr)
    ) {
      throw new Error();
    }

    if (this.isShip(arr)) {
      this.board[arr[0]][arr[1]].hit();
      this.hitAttacks.push(arr);
    } else {
      this.missedAttacks.push(arr);
    }
  }

  isAllSunk() {
    for (const row of this.board) {
      for (const square of row) {
        if (square && !square.isSunk()) {
          return false;
        }
      }
    }

    return true;
  }
}
