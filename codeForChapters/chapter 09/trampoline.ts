import type { FN } from "../common";

const trampoline = (fn: FN): any => {
  while (typeof fn === "function") {
    fn = fn();
  }
  return fn;
};

class Thunk {
  fn: FN;
  constructor(fn: FN) {
    this.fn = fn;
  }
}

const trampoline2 = (thk: Thunk) => {
  while (
    typeof thk === "object" &&
    thk.constructor.name === "Thunk"
  ) {
    thk = thk.fn();
  }
  return thk;
};

export { trampoline, trampoline2 };
