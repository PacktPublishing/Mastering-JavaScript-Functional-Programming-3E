function isEven(n: number): boolean {
  if (n === 0) {
    return true;
  } else {
    return isOdd(n - 1);
  }
}

function isOdd(n: number): boolean {
  if (n === 1) {
    return true;
  } else {
    return isEven(n - 1);
  }
}

console.log("22.. isEven?", isEven(22));
console.log("9... isOdd?", isOdd(5));
console.log("63... isEven?", isEven(63));
console.log("60... isOdd?", isOdd(60));

export {};
