const alternator = <FNType extends (...args: any[]) => any>(
  fn1: FNType,
  fn2: FNType
) =>
  ((...args: Parameters<FNType>) => {
    [fn1, fn2] = [fn2, fn1];
    return fn2(...args);
  }) as FNType;

export { alternator };
