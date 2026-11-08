import { renderPlayerOneBoard, renderPlayerTwoBoard } from "./modules/render.js";
import Player from "./modules/player.js";
import Ship from "./modules/ship.js";

export default class Game {
  playerOne = new Player();
  playerTwo = new Player();
  activePlayer = this.playerOne;

  get opponent() {
    return this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  isGameOver() {
    return this.playerOne.gameboard.isAllSunk() || this.playerTwo.gameboard.isAllSunk();
  }

  placeShipRandomly(player, ship) {
    const DIRECTIONS = ["up", "down", "left", "right"];
    let direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    let randomRow = Math.floor(Math.random() * 10);
    let randomCol = Math.floor(Math.random() * 10);
    let placed = false;

    while (!placed) {
      direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

      randomRow = Math.floor(Math.random() * 10);
      randomCol = Math.floor(Math.random() * 10);

      placed = player.gameboard.placeShip(ship, [randomRow, randomCol], direction);
    }
  }

  handleCellClick(event) {
    const row = Number(event.target.dataset.row);
    const column = Number(event.target.dataset.column);

    if (row >= 0 && column >= 0) {
      if (this.opponent.gameboard.isSquareAlreadyAttacked([row, column])) return;
      this.opponent.gameboard.receiveAttack([row, column]);

      if (this.isGameOver()) {
        alert("game over");
        return;
      }

      this.switchPlayer();
      this.activePlayer.randomAttack(this.opponent);

      if (this.isGameOver()) {
        alert("game over");
        return;
      }

      this.switchPlayer();

      renderPlayerOneBoard(this.playerOne.gameboard);
      renderPlayerTwoBoard(this.playerTwo.gameboard);
    }
  }

  switchPlayer() {
    this.activePlayer = this.activePlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  start() {
    const SHIPS = [5, 4, 3, 3, 2];

    for (const length of SHIPS) {
      this.placeShipRandomly(this.playerTwo, new Ship(length));
    }

    this.playerOne.gameboard.placeShip(new Ship(3), [5, 5], "right");
    // renderPlacement(this.playerOne.gameboard);
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
}
