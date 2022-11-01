// Factorials

function fact(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

const fact2 = (n: number): number => {
  if (n === 0) {
    return 1;
  } else {
    return n * fact2(n - 1);
  }
};

const fact3 = (n: number): number =>
  n === 0 ? 1 : n * fact3(n - 1);

// newCounter needs no type definitions;
// TypeScript is able to work types out

function newCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const nc = newCounter();

nc();
nc();

// Spreads

function sum3(a: number, b: number, c: number): number {
  return a + b + c;
}

const x: [number, number, number] = [1, 2, 3];
const y = sum3(...x); // equivalent to sum3(1,2,3)

const f = [1, 2, 3];
const g = [4, ...f, 5]; // [4,1,2,3,5]
const h = [...f, ...g]; // [1,2,3,4,1,2,3,5]

const p = { some: 3, data: 5 };
const q = { more: 8, ...p }; // { more:8, some:3, data:5 }

const numbers = [2, 2, 9, 6, 0, 1, 2, 4, 5, 6];
const minA = Math.min(...numbers); // 0

const maxArray = (arr: number[]) => Math.max(...arr);
const maxA = maxArray(numbers); // 9

export { fact, fact2, fact3 };
