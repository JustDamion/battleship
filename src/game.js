import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./modules/render.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";

export default class Game {
  playerOne = new Player();
  playerTwo = new Player();
  activePlayer = this.playerOne;
  inactivePlayer = this.playerTwo;

  handleCellClick(event) {
    const row = Number(event.target.dataset.row);
    const column = Number(event.target.dataset.column);

    if (row >= 0 && column >= 0) {
      this.attack(row, column);
      renderPlayerOneBoard(this.playerOne.gameboard);
      renderPlayerTwoBoard(this.playerTwo.gameboard);
    }
  }

  switchPlayer() {
    this.activePlayer = this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne;
    this.inactivePlayer = this.inactivePlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  start() {
    this.playerOne.gameboard.placeShip(new Ship(3), [5, 5], [3, 5]);
    this.playerTwo.gameboard.placeShip(new Ship(2), [1, 0], [1, 1]);
    renderPlayerOneBoard(this.playerOne.gameboard);
    renderPlayerTwoBoard(this.playerTwo.gameboard);

    const playerOneBoardElement = document.getElementById("player-one-board");
    const playerTwoBoardElement = document.getElementById("player-two-board");

    playerOneBoardElement.addEventListener("click", (event) => {
      if (this.activePlayer !== this.playerTwo) return;
      this.handleCellClick(event);
    });

    playerTwoBoardElement.addEventListener("click", (event) => {
      if (this.activePlayer !== this.playerOne) return;
      this.handleCellClick(event);
    });
  }

  attack(row, column) {
    this.inactivePlayer.gameboard.receiveAttack([row, column]);

    if (this.inactivePlayer.gameboard.isAllSunk()) {
      alert("game over");
    }

    this.switchPlayer();
  }
}
