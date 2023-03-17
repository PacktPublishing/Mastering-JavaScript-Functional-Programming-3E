function* range4(
  from: number,
  to: number,
  step: number = Math.sign(to - from)
): Generator<number> {
  do {
    yield from;
    from += step;
  } while (
    (step > 0 && to >= from) ||
    (step < 0 && to <= from)
  );
}

export { range4 };

/*
const fix1 = (x: number): number => Number(x.toFixed(1));

console.log("2..5", range2(2, 5));
console.log("2..5", range2b(2, 5));
console.log("2..5", [...range4(2, 5)]);

console.log("5..2", range2(5, 2));
console.log("5..2", range2b(5, 2));
console.log("5..2", [...range4(5, 2)]);

console.log("3..3", range2(3, 3));
console.log("3..3", range2b(3, 3));
console.log("3..3", [...range4(3, 3)]);

console.log("2..5", range2(2, 5, 0.4).map(fix1));
console.log("2..5", range2b(2, 5, 0.4).map(fix1));
console.log("2..5", [...range4(2, 5, 0.4)].map(fix1));

console.log("5..2", range2(5, 2, -0.4).map(fix1));
console.log("5..2", range2b(5, 2, -0.4).map(fix1));
console.log("5..2", [...range4(5, 2, -0.4)].map(fix1));

console.log("3..3", range2(3, 3));
console.log("3..3", range2b(3, 3));
console.log("3..3", [...range4(3, 3)]);

console.log("3..3", range2(3, 3));
console.log("3..3", range2b(3, 3));
console.log("3..3", [...range4(3, 3)]);

for (const i of range4(9, 22)) {
  console.log("IN LOOP, EXITING AT 12", i);
  if (i === 12) break;
}
*/
