import Player from "./modules/player.js";
import Ship from "./modules/ship.js";
import { renderBoard } from "./modules/render.js";

export default class Game {
  playerOne = new Player();
  playerTwo = new Player();
  currentPlayer = this.playerOne;
  inactivePlayer = this.playerTwo;

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;

    this.inactivePlayer = this.inactivePlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  start() {
    this.playerTwo.gameboard.placeShip(new Ship(2), [1, 0], [1, 1]);
    renderBoard(this.inactivePlayer.gameboard);

    const board = document.getElementById("board");

    board.addEventListener("click", (event) => {
      const row = Number(event.target.dataset.row);
      const column = Number(event.target.dataset.column);

      if (row && column) {
        this.inactivePlayer.gameboard.receiveAttack([row, column]);
        this.switchPlayer();
        renderBoard(this.inactivePlayer.gameboard);
      }
    });
  }
}
