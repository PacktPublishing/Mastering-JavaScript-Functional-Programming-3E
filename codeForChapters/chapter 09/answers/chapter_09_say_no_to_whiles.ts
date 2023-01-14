function evaluate(str: string) {
  const PLUS = "+";
  const MINUS = "-";
  const TIMES = "*";
  const DIVIDES = "/";
  const MODULUS = "%";
  const LPARENS = "(";
  const RPARENS = ")";

  let curr = 0;
  const tokens = str
    .split("")
    .map((x) => (Number.isNaN(Number(x)) ? x : Number(x)));

  return expression();

  function expression(): number {
    for (let accum = term(); ; ) {
      if (tokens[curr] === PLUS) {
        curr++; // skip PLUS
        accum += term();
      } else if (tokens[curr] === MINUS) {
        curr++; // skip MINUS
        accum -= term();
      } else {
        return accum;
      }
    }
  }

  function term(): number {
    for (let accum = factor(); ; ) {
      if (tokens[curr] === TIMES) {
        curr++; // skip TIMES
        accum *= factor();
      } else if (tokens[curr] === DIVIDES) {
        curr++; // skip DIVIDES
        accum /= factor();
      } else if (tokens[curr] === MODULUS) {
        curr++; // skip MODULUS
        accum %= factor();
      } else {
        return accum;
      }
    }
  }

  function factor(): number {
    let mult = 1;
    if (tokens[curr] === MINUS) {
      mult = -1;
      curr++; // skip MINUS
    }

    let result = 0;
    if (tokens[curr] === LPARENS) {
      curr++; // skip LPARENS
      result = expression();
      curr++; // skip RPARENS
    } else {
      result = tokens[curr] as number;
      curr++;
    }
    return mult * result;
  }
}

console.log(evaluate("2+3*5"));
console.log(evaluate("2*3+5"));
console.log(evaluate("2+(5+3)*4"));

console.log(evaluate("7+7/7+7*7-7"));

export {};
