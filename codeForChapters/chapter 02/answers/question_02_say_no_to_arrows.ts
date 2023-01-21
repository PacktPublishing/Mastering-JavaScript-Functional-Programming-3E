function once<FNType extends (...args: any[]) => any>(
  fn: FNType
): FNType {
  let done = false;

  return function (...args: Parameters<FNType>) {
    if (!done) {
      done = true;
      return fn(...args);
    }
  } as FNType;
}

function onceAndAfter<
  FNType extends (...args: any[]) => any
>(f: FNType, g: FNType): FNType {
  let done = false;

  return function (...args: Parameters<FNType>) {
    if (!done) {
      done = true;
      return f(...args);
    } else {
      return g(...args);
    }
  } as FNType;
}

export { once, onceAndAfter };
