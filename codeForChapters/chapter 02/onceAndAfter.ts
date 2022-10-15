const onceAndAfter = <
  FNType extends (...args: any[]) => any
>(
  f: FNType,
  g: FNType
) => {
  let done = false;

  return ((...args: Parameters<FNType>) => {
    if (!done) {
      done = true;
      return f(...args);
    } else {
      return g(...args);
    }
  }) as FNType;
};

export { onceAndAfter };
