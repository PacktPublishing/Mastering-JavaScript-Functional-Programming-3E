function fact(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

console.log(fact(5)); // 120

const fact2 = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * fact2(n - 1);
  }
};
console.log(fact2(5)); // also 120

const fact3 = (n) => (n === 0 ? 1 : n * fact3(n - 1));

console.log(fact3(5)); // again 120

export { fact, fact2, fact3 };
