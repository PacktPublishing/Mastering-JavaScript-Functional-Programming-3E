function fact(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

console.log(fact(5)); // 120

function fact2(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    const aux = fact2(n - 1);
    return n * aux;
  }
}
console.log(fact2(5)); // also 120

const fact3 = (n: number): number =>
  n === 0 ? 1 : n * fact3(n - 1);

console.log(fact3(5)); // again 120

export { fact, fact2, fact3 };
