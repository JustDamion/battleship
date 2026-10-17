const BOARD_SIZE = 10;

export default class GameBoard {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

  placeShip(ship, start, end) {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;

    if (
      startRow >= BOARD_SIZE ||
      startRow < 0 ||
      startCol >= BOARD_SIZE ||
      startCol < 0 ||
      endRow >= BOARD_SIZE ||
      endRow < 0 ||
      endCol >= BOARD_SIZE ||
      endCol < 0 ||
      (Math.abs(endRow - startRow) !== 0 && Math.abs(endCol - startCol) !== 0)
    ) {
      throw new Error();
    }

    const stepRow = Math.sign(endRow - startRow);
    const stepCol = Math.sign(endCol - startCol);

    for (let i = 0; i < ship.length; i++) {
      this.board[startRow + i * stepRow][startCol + i * stepCol] = ship;
    }
  }

  isShip(arr) {
    return this.board[arr[0]][arr[1]] !== null;
  }
}
