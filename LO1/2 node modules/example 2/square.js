// square.js
// Assigning to exports will not modify module
// Must use module.exports

module.exports = class Square {
  constructor(width) {
    this.width = width;
  }

  area() {
    return this.width ** 2;
  }
};
