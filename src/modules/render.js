function renderBoard(gameboard, container, hideShips = false) {
  gameboard.board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const square = document.createElement("button");
      square.setAttribute("class", "board__square");
      square.setAttribute("data-row", rowIndex);
      square.setAttribute("data-column", columnIndex);

      if (gameboard.missedAttacks.has(`${rowIndex},${columnIndex}`)) {
        square.classList.add("board__square--miss");
      }

      if (gameboard.hitAttacks.has(`${rowIndex},${columnIndex}`)) {
        square.classList.add("board__square--hit");
      }

      if (!hideShips && gameboard.ships.has(`${rowIndex},${columnIndex}`)) {
        square.classList.add("ship");
      }

      container.appendChild(square);
    });
  });
}

function renderPlayerOneBoard(gameboard) {
  const container = document.getElementById("player-one-board");
  const playerOne = document.getElementById("player-one");
  const playerOneTitle =
    document.getElementById("player-one-title") || document.createElement("h1");
  playerOneTitle.textContent = "Player 1";
  playerOneTitle.setAttribute("class", "player-one__title");
  playerOneTitle.setAttribute("id", "player-one-title");
  playerOne.appendChild(playerOneTitle);

  container.textContent = "";
  renderBoard(gameboard, container);
}

function renderPlayerTwoBoard(gameboard) {
  const container = document.getElementById("player-two-board");
  const playerTwo = document.getElementById("player-two");
  const playerTwoTitle =
    document.getElementById("player-two-title") || document.createElement("h1");
  playerTwoTitle.textContent = "Player 2";
  playerTwoTitle.setAttribute("class", "player-two__title");
  playerTwoTitle.setAttribute("id", "player-two-title");
  playerTwo.appendChild(playerTwoTitle);

  container.textContent = "";
  renderBoard(gameboard, container, true);
}

function renderPlacement(gameboard) {
  const board = document.getElementById("placement-board");
  board.textContent = "";
  renderBoard(gameboard, board, false);
}

export { renderPlayerOneBoard, renderPlayerTwoBoard, renderPlacement };
