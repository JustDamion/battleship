import { test, expect, describe } from "@jest/globals";
import GameBoard from "./gameboard.js";
import Ship from "./ship.js";

let board, smallShip, mediumShip;

beforeEach(() => {
  board = new GameBoard();
  smallShip = new Ship(2);
  mediumShip = new Ship(3);
});

describe("ship placement functions correctly", () => {
  test("places ship vertically across all cells between start and end", () => {
    board.placeShip(smallShip, [0, 1], [1, 1]);

    expect(board.isShip([0, 1])).toBe(true);
    expect(board.isShip([1, 1])).toBe(true);
    expect(board.isShip([2, 1])).toBe(false);
  });

  test("places ship vertically across all cells between start and end backwards", () => {
    board.placeShip(mediumShip, [5, 1], [3, 1]);

    expect(board.isShip([2, 1])).toBe(false);
    expect(board.isShip([3, 1])).toBe(true);
    expect(board.isShip([4, 1])).toBe(true);
    expect(board.isShip([5, 1])).toBe(true);
    expect(board.isShip([6, 1])).toBe(false);
  });

  test("places ship horizontally across all cells between start and end", () => {
    board.placeShip(smallShip, [0, 0], [0, 1]);

    expect(board.isShip([0, 0])).toBe(true);
    expect(board.isShip([0, 1])).toBe(true);
    expect(board.isShip([0, 2])).toBe(false);
  });

  test("places ship horizontally across all cells between start and end backwards", () => {
    board.placeShip(mediumShip, [5, 1], [5, 3]);

    expect(board.isShip([5, 0])).toBe(false);
    expect(board.isShip([5, 1])).toBe(true);
    expect(board.isShip([5, 2])).toBe(true);
    expect(board.isShip([5, 3])).toBe(true);
    expect(board.isShip([5, 4])).toBe(false);
  });

  test("start row position can not be outside of max board size", () => {
    expect(() => board.placeShip(mediumShip, [11, 0], [9, 0])).toThrow();
    expect(board.isShip([9, 0])).toBe(false);
  });

  test("start row position can not be outside of min board size", () => {
    expect(() => board.placeShip(mediumShip, [-1, 0], [1, 0])).toThrow();
    expect(board.isShip([1, 0])).toBe(false);
  });

  test("start col position can not be outside of max board size", () => {
    expect(() => board.placeShip(mediumShip, [0, 11], [0, 9])).toThrow();
    expect(board.isShip([0, 9])).toBe(false);
  });

  test("start col position can not be outside of min board size", () => {
    expect(() => board.placeShip(mediumShip, [0, -1], [0, 1])).toThrow();
    expect(board.isShip([0, 1])).toBe(false);
  });

  test("end row position can not be outside of max board size", () => {
    expect(() => board.placeShip(mediumShip, [9, 0], [11, 0])).toThrow();
    expect(board.isShip([9, 0])).toBe(false);
  });

  test("end row position can not be outside of min board size", () => {
    expect(() => board.placeShip(mediumShip, [1, 0], [-1, 0])).toThrow();
    expect(board.isShip([1, 0])).toBe(false);
  });

  test("end col position can not be outside of max board size", () => {
    expect(() => board.placeShip(mediumShip, [0, 9], [0, 11])).toThrow();
    expect(board.isShip([0, 9])).toBe(false);
  });

  test("end col position can not be outside of min board size", () => {
    expect(() => board.placeShip(mediumShip, [0, 1], [0, -1])).toThrow();
    expect(board.isShip([0, 1])).toBe(false);
  });

  test("ship can not be placed diagonally", () => {
    expect(() => board.placeShip(mediumShip, [0, 0], [2, 2])).toThrow();
    expect(board.isShip([0, 0])).toBe(false);
  });
});

// describe("attacks function properly", () => {
//   test("board can receive a missed attack", () => {
//     board.receiveAttack([3, 4]);
//     expect(board.missedAttacks).toContainEqual([3, 4]);
//   });

//   test("board can receive a attack that hits ship", () => {
//     board.receiveAttack([0, 1]);
//   });

//   test("board can list missed attacks", () => {
//     expect(board.missedAttacks.length).toBe(1);
//   });
// });

// test("board can report if all ships are not sunk", () => {
//   expect(board.isAllSunk()).toBe(false);
// });

// test("board can report if all ships are sunk", () => {
//   board.receiveAttack([0, 1]);
//   board.receiveAttack([0, 1]);
//   board.receiveAttack([0, 1]);
//   expect(board.isAllSunk()).toBe(false);
// });
