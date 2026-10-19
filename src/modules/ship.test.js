import { beforeEach, describe, expect, it } from "@jest/globals";
import Ship from "./ship.js";

let ship = null;

beforeEach(() => {
  ship = new Ship(3);
});

describe("hit and sink", () => {
  it("should increase number of hits to 1", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("should increase number of hits to 2", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("should check that the ship is not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });

  it("should hit ship and check that ship is sunk", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
