import { beforeEach, describe, expect, it } from "@jest/globals";
import Game from "./game.js";

let game = null;

beforeEach(() => {
  game = new Game();
});

describe("Game", () => {
  it("starts with player one's turn", () => {
    expect(game.activePlayer).toBe(game.playerOne);
  });

  it("starts with player two as inactive", () => {
    expect(game.inactivePlayer).toBe(game.playerTwo);
  });

  describe("switchPlayer", () => {
    it("switches current player to player two", () => {
      game.switchPlayer();
      expect(game.activePlayer).toBe(game.playerTwo);
    });

    it("switches inactive player to player one", () => {
      game.switchPlayer();
      expect(game.inactivePlayer).toBe(game.playerOne);
    });
  });
});
