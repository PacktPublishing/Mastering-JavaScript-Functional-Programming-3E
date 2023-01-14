type FN = (...args: any[]) => any;

function detectTCO() {
  const outerStackLen = new Error().stack!.length;
  return (function inner() {
    const innerStackLen = new Error().stack!.length;
    return innerStackLen <= outerStackLen;
  })();
}
/*
console.log(detectTCO());
*/

function justLoop(n: number): void {
  n && justLoop(n - 1); // until n is zero
}

function fact(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

function fact2(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    const aux = fact2(n - 1);
    return n * aux;
  }
}

function getTime() {
  return new Date().toTimeString();
}
console.log(getTime()); // "21:00:24 GMT+0530 (IST)"

function getTime2(cont: FN) {
  return cont(new Date().toTimeString());
}
getTime2(console.log); // similar result as above

function factC(n: number, cont: FN): number {
  if (n === 0) {
    return cont(1);
  } else {
    return factC(n - 1, (x) => cont(n * x));
  }
}

factC(7, console.log); // 5040, correctly
console.log(factC(7, (x) => x));

const fibC = (n: number, cont: FN): number => {
  if (n <= 1) {
    return cont(n);
  } else {
    return fibC(n - 2, (p) =>
      fibC(n - 1, (q) => cont(p + q))
    );
  }
};

fibC(10, console.log);

export {};
