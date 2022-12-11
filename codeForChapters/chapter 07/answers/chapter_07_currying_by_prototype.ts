declare global {
  interface Function {
    curry(): (...args: any) => any;
  }
}

Function.prototype.curry = function () {
  return this.length === 0
    ? this()
    : (p) => this.bind(this, p).curry();
};

export {};
