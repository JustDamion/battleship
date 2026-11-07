export default class Ship {
  hits = 0;

  constructor(length) {
    this.length = length;
  }

  hit() {
    if (!this.isSunk()) this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
