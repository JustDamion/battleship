const BOARD_SIZE = 10;

export default class GameBoard {
  board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  missedAttacks = [];
  hitAttacks = [];

  isInBounds(arr) {
    return arr[0] >= 0 && arr[0] < BOARD_SIZE && arr[1] >= 0 && arr[1] < BOARD_SIZE;
  }

  isSquareAlreadyAttacked(arr) {
    const isSameSquare = ([row, col]) => row === arr[0] && col === arr[1];
    return this.missedAttacks.some(isSameSquare) || this.hitAttacks.some(isSameSquare);
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

  isShip(arr) {
    if (!this.isInBounds(arr)) throw new Error();
    return this.board[arr[0]][arr[1]] !== null;
  }

  receiveAttack(arr) {
    if (this.isSquareAlreadyAttacked(arr) || !this.isInBounds(arr)) {
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
