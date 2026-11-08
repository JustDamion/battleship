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
  container.textContent = "";
  renderBoard(gameboard, container);
}

function renderPlayerTwoBoard(gameboard) {
  const container = document.getElementById("player-two-board");
  container.textContent = "";
  renderBoard(gameboard, container);
}

function renderPlacement(gameboard) {
  const board = document.getElementById("placement-board");
  renderBoard(gameboard, board, false);
}

export { renderPlayerOneBoard, renderPlayerTwoBoard, renderPlacement };
