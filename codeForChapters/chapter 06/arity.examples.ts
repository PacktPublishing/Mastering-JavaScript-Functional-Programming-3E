import { unary, arity } from "./arity";

console.log(["123.45", "-67.8", "90"].map(unary(parseInt)));
// [123, -67, 90]

console.log(
  ["123.45", "-67.8", "90"].map((x) =>
    parseInt(x, undefined)
  )
);

const pp = arity(1, parseInt);

console.log(["123.45", "-67.8", "90"].map(pp));
// [123, -67, 90]
