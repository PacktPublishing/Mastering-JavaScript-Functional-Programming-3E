function isEven(n: number): boolean {
  if (n === 0) {
    return true;
  } else {
    return isOdd(n - 1);
  }
}

function isOdd(n: number): boolean {
  return !isEven(n);
}

function isEven2(n: number): boolean {
  if (n === 0) {
    return true;
  } else {
    return !isEven2(n - 1);
  }
}

function isOdd2(n: number): boolean {
  return !isEven2(n);
}

function isEven3(n: number): boolean {
  if (n === 0) {
    return true;
  } else {
    return isOdd3(n - 1);
  }
}

function isOdd3(n: number): boolean {
  if (n === 0) {
    return false;
  } else {
    return isEven3(n - 1);
  }
}

console.log("22.. isEven?", isEven(22));
console.log("9... isOdd?", isOdd(5));
console.log("60... isOdd?", isOdd(10));

console.log("22.. isEven?", isEven2(22));
console.log("9... isOdd?", isOdd2(5));
console.log("60... isOdd?", isOdd2(10));

console.log("22.. isEven?", isEven3(22));
console.log("9... isOdd?", isOdd3(5));
console.log("60... isOdd?", isOdd3(10));

export {};
