import { describe, expect, it } from "@jest/globals";
import GameBoard from "./gameboard.js";
import Player from "./player.js";

describe("player", () => {
  it("should have a gameboard", () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(GameBoard);
  });
});
