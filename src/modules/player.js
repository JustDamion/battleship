import GameBoard from "./gameboard.js";

export default class Player {
  gameboard = new GameBoard();

  randomAttack(targetPlayer) {
    let randomRow = Math.floor(Math.random() * 10);
    let randomCol = Math.floor(Math.random() * 10);

    while (targetPlayer.gameboard.isSquareAlreadyAttacked([randomRow, randomCol])) {
      randomRow = Math.floor(Math.random() * 10);
      randomCol = Math.floor(Math.random() * 10);
    }

    targetPlayer.gameboard.receiveAttack([randomRow, randomCol]);
  }
}
