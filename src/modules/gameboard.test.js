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
  it("places a ship vertically between start and end", () => {
    board.placeShip(smallShip, [0, 1], [1, 1]);

    expect(board.isShip([0, 1])).toBe(true);
    expect(board.isShip([1, 1])).toBe(true);
    expect(board.isShip([2, 1])).toBe(false);
  });

  it("places a ship vertically when end is before start", () => {
    board.placeShip(mediumShip, [5, 1], [3, 1]);

    expect(board.isShip([2, 1])).toBe(false);
    expect(board.isShip([3, 1])).toBe(true);
    expect(board.isShip([4, 1])).toBe(true);
    expect(board.isShip([5, 1])).toBe(true);
    expect(board.isShip([6, 1])).toBe(false);
  });

  it("places a ship horizontally between start and end", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);

    expect(board.isShip([0, 0])).toBe(true);
    expect(board.isShip([0, 1])).toBe(true);
    expect(board.isShip([0, 2])).toBe(false);
  });

  it("places a ship horizontally when end is before start", () => {
    board.placeShip(mediumShip, [5, 3], [5, 1]);

    expect(board.isShip([5, 0])).toBe(false);
    expect(board.isShip([5, 1])).toBe(true);
    expect(board.isShip([5, 2])).toBe(true);
    expect(board.isShip([5, 3])).toBe(true);
    expect(board.isShip([5, 4])).toBe(false);
  });

  describe("rejects invalid placement", () => {
    it("throws when the ship overlaps another ship", () => {
      board.placeShip(smallShip, [4, 4], [4, 5]);
      expect(() => board.placeShip(mediumShip, [3, 4], [5, 4])).toThrow("");
      expect(board.isShip([3, 4])).toBe(false);
    });

    it("throws when the ship is shorter than the span", () => {
      expect(() => board.placeShip(smallShip, [0, 0], [0, 5])).toThrow("");
    });

    it("throws when the ship is longer than the span", () => {
      expect(() => board.placeShip(mediumShip, [0, 0], [0, 1])).toThrow("");
    });

    it("throws when placement is diagonal", () => {
      expect(() => board.placeShip(mediumShip, [0, 0], [2, 2])).toThrow("");
      expect(board.isShip([0, 0])).toBe(false);
    });

    it("throws when the start row is larger than max board size", () => {
      expect(() => board.placeShip(mediumShip, [10, 0], [9, 0])).toThrow("");
      expect(board.isShip([9, 0])).toBe(false);
    });

    it("throws when the start row is negative", () => {
      expect(() => board.placeShip(mediumShip, [-1, 0], [1, 0])).toThrow("");
      expect(board.isShip([1, 0])).toBe(false);
    });

    it("throws when the start col is larger than max board size", () => {
      expect(() => board.placeShip(mediumShip, [0, 10], [0, 9])).toThrow("");
      expect(board.isShip([0, 9])).toBe(false);
    });

    it("throws when the start col is negative", () => {
      expect(() => board.placeShip(mediumShip, [0, -1], [0, 1])).toThrow("");
      expect(board.isShip([0, 1])).toBe(false);
    });

    it("throws when the end row is larger than max board size", () => {
      expect(() => board.placeShip(mediumShip, [9, 0], [10, 0])).toThrow("");
      expect(board.isShip([9, 0])).toBe(false);
    });

    it("throws when the end row is negative", () => {
      expect(() => board.placeShip(mediumShip, [1, 0], [-1, 0])).toThrow("");
      expect(board.isShip([1, 0])).toBe(false);
    });

    it("throws when the end col is larger than max board size", () => {
      expect(() => board.placeShip(mediumShip, [0, 9], [0, 10])).toThrow("");
      expect(board.isShip([0, 9])).toBe(false);
    });

    it("throws when the end col is negative", () => {
      expect(() => board.placeShip(mediumShip, [0, 1], [0, -1])).toThrow("");
      expect(board.isShip([0, 1])).toBe(false);
    });
  });
});

describe("receiveAttack", () => {
  it("records miss when the square is empty", () => {
    board.receiveAttack([3, 4]);
    expect(board.missedAttacks).toContainEqual([3, 4]);
  });

  it("does not record a miss when the attack hits a ship", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.receiveAttack([0, 1]);
    expect(board.missedAttacks).not.toContainEqual([0, 1]);
  });

  it("records hit when hitting a ship", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.receiveAttack([0, 1]);
    expect(board.hitAttacks).toContainEqual([0, 1]);
  });

  it("does not record a hit when the attack misses", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.receiveAttack([0, 2]);
    expect(board.hitAttacks).not.toContainEqual([0, 2]);
  });

  it("increases the ship's hit count when it hits", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.receiveAttack([0, 1]);
    expect(smallShip.hits).toBe(1);
  });

  describe("rejects invalid attack", () => {
    it("throws when the square was already attacked and missed", () => {
      board.receiveAttack([0, 1]);
      expect(() => board.receiveAttack([0, 1])).toThrow("");
    });

    it("throws when the square was already attacked and hit", () => {
      board.placeShip(smallShip, [0, 0], [0, 1]);
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
    board.placeShip(smallShip, [0, 0], [0, 1]);
    expect(board.isAllSunk()).toBe(false);
  });

  it("should be false when only one of two ships are sunk", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.placeShip(mediumShip, [4, 4], [6, 4]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    expect(board.isAllSunk()).toBe(false);
  });

  it("should be true when all ships are sunk", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    expect(board.isAllSunk()).toBe(true);
  });
});
