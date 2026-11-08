const BOARD_SIZE = 10;

export default class GameBoard {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  ships = new Set();
  missedAttacks = new Set();
  hitAttacks = new Set();

  key([row, col]) {
    return `${row},${col}`;
  }

  isInBounds([row, col]) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  }

  isSquareAlreadyAttacked([row, col]) {
    return (
      this.missedAttacks.has(this.key([row, col])) || this.hitAttacks.has(this.key([row, col]))
    );
  }

  isShip([row, col]) {
    if (!this.isInBounds([row, col])) throw new RangeError();
    return this.board[row][col] !== null;
  }

  placeShip(ship, [row, col], direction) {
    const DIRECTIONS = {
      up: [-1, 0],
      down: [1, 0],
      left: [0, -1],
      right: [0, 1],
    };

    for (let i = 0; i < ship.length; i++) {
      const placeRow = row + i * DIRECTIONS[direction][0];
      const placeCol = col + i * DIRECTIONS[direction][1];

      if (!this.isInBounds([placeRow, placeCol]) || this.isShip([placeRow, placeCol])) return false;
    }

    for (let i = 0; i < ship.length; i++) {
      const placeRow = row + i * DIRECTIONS[direction][0];
      const placeCol = col + i * DIRECTIONS[direction][1];

      this.board[placeRow][placeCol] = ship;
      this.ships.add(this.key([placeRow, placeCol]));
    }

    return true;
  }

  receiveAttack([row, col]) {
    if (this.isSquareAlreadyAttacked([row, col]) || !this.isInBounds([row, col])) {
      throw new Error();
    }

    if (this.isShip([row, col])) {
      this.board[row][col].hit();
      this.hitAttacks.add(this.key([row, col]));
    } else {
      this.missedAttacks.add(this.key([row, col]));
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
