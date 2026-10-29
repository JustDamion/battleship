import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./modules/render.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";

export default class Game {
  playerOne = new Player();
  playerTwo = new Player();
  activePlayer = this.playerOne;
  inactivePlayer = this.playerTwo;

  switchPlayer() {
    this.activePlayer = this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne;
    this.inactivePlayer = this.inactivePlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  start() {
    this.playerOne.gameboard.placeShip(new Ship(3), [5, 5], [3, 5]);
    this.playerTwo.gameboard.placeShip(new Ship(2), [1, 0], [1, 1]);
    renderPlayerOneBoard(this.playerOne.gameboard);
    renderPlayerTwoBoard(this.playerTwo.gameboard);

    const board =
      this.activePlayer === this.playerOne
        ? document.getElementById("player-one-board")
        : document.getElementById("player-two-board");

    board.addEventListener("click", (event) => {
      const row = Number(event.target.dataset.row);
      const column = Number(event.target.dataset.column);

      if (row && column) {
        this.inactivePlayer.gameboard.receiveAttack([row, column]);

        if (this.inactivePlayer.gameboard.isAllSunk()) {
          alert("game over");
        }

        this.switchPlayer();
        renderPlayerOneBoard(this.playerOne.gameboard);
        renderPlayerTwoBoard(this.playerTwo.gameboard);
      }
    });
  }
}
