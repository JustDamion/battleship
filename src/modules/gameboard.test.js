import { beforeEach, describe, expect, it } from "@jest/globals";
import GameBoard from "./gameboard.js";
import Ship from "./ship.js";

let board = null;
let mediumShip = null;
let smallShip = null;

beforeEach(() => {
  board = new GameBoard();
  smallShip = new Ship(2);
  mediumShip = new Ship(3);
});

describe("placeShip", () => {
  describe("valid placements", () => {
    it("places a ship vertically pointing up", () => {
      board.placeShip(smallShip, [2, 1], "up");

      expect(board.isShip([2, 1])).toBe(true);
      expect(board.isShip([1, 1])).toBe(true);
      expect(board.isShip([0, 1])).toBe(false);
    });

    it("places a ship vertically pointing down", () => {
      board.placeShip(mediumShip, [3, 1], "down");

      expect(board.isShip([2, 1])).toBe(false);
      expect(board.isShip([3, 1])).toBe(true);
      expect(board.isShip([4, 1])).toBe(true);
      expect(board.isShip([5, 1])).toBe(true);
      expect(board.isShip([6, 1])).toBe(false);
    });

    it("places a ship horizontally pointing right", () => {
      board.placeShip(smallShip, [0, 0], "right");

      expect(board.isShip([0, 0])).toBe(true);
      expect(board.isShip([0, 1])).toBe(true);
      expect(board.isShip([0, 2])).toBe(false);
    });

    it("places a ship horizontally pointing left", () => {
      board.placeShip(mediumShip, [5, 3], "left");

      expect(board.isShip([5, 0])).toBe(false);
      expect(board.isShip([5, 1])).toBe(true);
      expect(board.isShip([5, 2])).toBe(true);
      expect(board.isShip([5, 3])).toBe(true);
      expect(board.isShip([5, 4])).toBe(false);
    });
  });

  describe("invalid placements", () => {
    it("returns false when the ship overlaps another ship", () => {
      board.placeShip(mediumShip, [0, 2], "down");
      expect(board.placeShip(mediumShip, [1, 1], "right")).toBe(false);
      expect(board.isShip([1, 1])).toBe(false);
    });

    it("returns false when the start row is larger than max board size", () => {
      expect(board.placeShip(mediumShip, [10, 0], "right")).toBe(false);
      expect(board.isShip([9, 0])).toBe(false);
    });

    it("returns false when the start row is negative", () => {
      expect(board.placeShip(mediumShip, [-1, 0], "left")).toBe(false);
      expect(board.isShip([1, 0])).toBe(false);
    });

    it("returns false when the start col is larger than max board size", () => {
      expect(board.placeShip(mediumShip, [0, 10], "up")).toBe(false);
      expect(board.isShip([0, 9])).toBe(false);
    });

    it("returns false when the start col is negative", () => {
      expect(board.placeShip(mediumShip, [0, -1], "down")).toBe(false);
      expect(board.isShip([0, 1])).toBe(false);
    });
  });
});

describe("receiveAttack", () => {
  describe("successful attacks", () => {
    it("records hit when hitting a ship", () => {
      board.placeShip(smallShip, [0, 0], "right");
      board.receiveAttack([0, 1]);
      expect(board.hitAttacks).toContainEqual("0,1");
    });

    it("increases the ship's hit count when it hits", () => {
      board.placeShip(smallShip, [0, 0], "right");
      board.receiveAttack([0, 1]);
      expect(smallShip.hits).toBe(1);
    });

    it("does not record a miss when the attack hits a ship", () => {
      board.placeShip(smallShip, [0, 0], "right");
      board.receiveAttack([0, 1]);
      expect(board.missedAttacks).not.toContainEqual("0,1");
    });
  });

  describe("missed attacks", () => {
    it("records miss when the square is empty", () => {
      board.receiveAttack([3, 4]);
      expect(board.missedAttacks).toContainEqual("3,4");
    });

    it("does not record a hit when the attack misses", () => {
      board.placeShip(smallShip, [0, 0], "right");
      board.receiveAttack([0, 2]);
      expect(board.hitAttacks).not.toContainEqual("0,2");
    });
  });

  describe("invalid attacks", () => {
    it("throws when the square was already attacked and missed", () => {
      board.receiveAttack([0, 1]);
      expect(() => board.receiveAttack([0, 1])).toThrow("");
    });

    it("throws when the square was already attacked and hit", () => {
      board.placeShip(smallShip, [0, 0], "right");
      board.receiveAttack([0, 1]);
      expect(() => board.receiveAttack([0, 1])).toThrow("");
    });

    it("throws when attack row is negative", () => {
      expect(() => board.receiveAttack([-1, 0])).toThrow("");
    });

    it("throws when attack row is larger than max board size", () => {
      expect(() => board.receiveAttack([10, 0])).toThrow("");
    });

    it("throws when attack col is negative", () => {
      expect(() => board.receiveAttack([0, -1])).toThrow("");
    });

    it("throws when attack col is larger than max board size", () => {
      expect(() => board.receiveAttack([0, 10])).toThrow("");
    });
  });
});

describe("isAllSunk", () => {
  it("should be true when no ships have been placed", () => {
    expect(board.isAllSunk()).toBe(true);
  });

  it("should be false when not all ships are sunk", () => {
    board.placeShip(smallShip, [0, 0], "right");
    expect(board.isAllSunk()).toBe(false);
  });

  it("should be false when only one of two ships are sunk", () => {
    board.placeShip(smallShip, [0, 0], "right");
    board.placeShip(mediumShip, [4, 4], "down");
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    expect(board.isAllSunk()).toBe(false);
  });

  it("should be true when all ships are sunk", () => {
    board.placeShip(smallShip, [0, 0], "right");
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    expect(board.isAllSunk()).toBe(true);
  });
});
