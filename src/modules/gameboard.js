const BOARD_SIZE = 10;

export default class GameBoard {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  missedAttacks = new Set();
  hitAttacks = new Set();

  isInBounds([row, col]) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  }

  isSquareAlreadyAttacked([row, col]) {
    return this.missedAttacks.has(`${row},${col}`) || this.hitAttacks.has(`${row},${col}`);
  }

  isShip([row, col]) {
    if (!this.isInBounds([row, col])) throw new RangeError();
    return this.board[row][col] !== null;
  }

  placeShip(ship, [row, col], direction) {
    const directions = {
      up: [-1, 0],
      down: [1, 0],
      left: [0, -1],
      right: [0, 1],
    };

    for (let i = 0; i < ship.length; i++) {
      const placeRow = row + i * directions[direction][0];
      const placeCol = col + i * directions[direction][1];

      if (this.isShip([placeRow, placeCol])) throw new Error();
    }

    for (let i = 0; i < ship.length; i++) {
      const placeRow = row + i * directions[direction][0];
      const placeCol = col + i * directions[direction][1];

      this.board[placeRow][placeCol] = ship;
    }
  }

  receiveAttack([row, col]) {
    if (this.isSquareAlreadyAttacked([row, col]) || !this.isInBounds([row, col])) {
      throw new Error();
    }

    if (this.isShip([row, col])) {
      this.board[row][col].hit();
      this.hitAttacks.add(`${row},${col}`);
    } else {
      this.missedAttacks.add(`${row},${col}`);
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
