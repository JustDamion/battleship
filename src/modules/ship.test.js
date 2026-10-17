import { describe, test, expect } from "@jest/globals";
import Ship from "./ship.js";

describe("hit functionality works", () => {
  const ship = new Ship(3);

  test("hit function increases number of hits on ship", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("hit function increases number of hits on ship", () => {
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("ship is not sunk if hits are not equal to length", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("ship sinks if hits is equal to length", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
