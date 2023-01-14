type FN = (...args: any[]) => any;

const trampoline = (fn: FN): any => {
  while (typeof fn === "function") {
    fn = fn();
  }
  return fn;
};

function isEven(n: number, cont: FN): () => boolean {
  if (n === 0) {
    return trampoline(() => cont(true));
  } else {
    return trampoline(() => isOdd(n - 1, (v) => cont(v)));
  }
}

function isOdd(n: number, cont: FN): () => boolean {
  return trampoline(() => isEven(n, (v) => cont(!v)));
}

function isEvenT(n: number): boolean {
  return trampoline(isEven(n, (x) => x));
}

function isOddT(n: number): boolean {
  return trampoline(isOdd(n, (x) => x));
}

console.log("22.. isEven?", isEvenT(22));
console.log("9... isOdd?", isOddT(5));
console.log("63... isEven?", isEvenT(63));
console.log("60... isOdd?", isOddT(60));

export {};
