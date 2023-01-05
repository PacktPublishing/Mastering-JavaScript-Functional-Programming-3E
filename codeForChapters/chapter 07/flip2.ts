function flip2<A, B, R>(fn: (a: A, b: B) => R) {
  return (p1: B, p2: A) => fn(p2, p1);
}

export { flip2 };
