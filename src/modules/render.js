function renderBoard(gameboard) {
  const container = document.getElementById("board");
  container.textContent = "";
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

      square.textContent = cell;
      container.appendChild(square);
    });
  });
}

export { renderBoard };
