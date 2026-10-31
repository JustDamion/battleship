function renderBoard(gameboard, container, hideShips = false) {
  gameboard.board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const square = document.createElement("button");
      square.setAttribute("class", "board__square");
      square.setAttribute("data-row", rowIndex);
      square.setAttribute("data-column", columnIndex);

      if (
        gameboard.missedAttacks.some(
          ([missRow, missCol]) => missRow === rowIndex && missCol === columnIndex,
        )
      ) {
        square.classList.add("board__square--miss");
      }

      if (
        gameboard.hitAttacks.some(
          ([missRow, missCol]) => missRow === rowIndex && missCol === columnIndex,
        )
      ) {
        square.classList.add("board__square--hit");
      }

      if (!hideShips) {
        square.textContent = cell;
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
  renderBoard(gameboard, container, true);
}

export { renderPlayerOneBoard, renderPlayerTwoBoard };
