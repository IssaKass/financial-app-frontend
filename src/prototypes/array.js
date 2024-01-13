Object.defineProperty(Array.prototype, "sum", {
  value: function () {
    return this.reduce((acc, current) => acc + current, 0);
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(Array.prototype, "avg", {
  value: function () {
    return this.sum() / this.length;
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(Array.prototype, "max", {
  value: function () {
    return this.reduce((a, b) => Math.max(a, b), -Infinity);
  },
  enumerable: false,
  configurable: true,
});

Object.defineProperty(Array.prototype, "min", {
  value: function () {
    return this.reduce((a, b) => Math.min(a, b), Infinity);
  },
  enumerable: false,
  configurable: true,
});
