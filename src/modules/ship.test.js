import { describe, expect, it } from "@jest/globals";
import Ship from "./ship.js";

describe("hit and sink", () => {
  const ship = new Ship(3);

  it("should increase number of hits to 1", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("should increase number of hits to 2", () => {
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("should check that the ship is not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });

  it("should hit ship and check that ship is sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
