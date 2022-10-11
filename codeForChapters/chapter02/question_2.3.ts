const thisManyTimes =
  <FNType extends (...args: any[]) => any>(
    fn: FNType,
    limit: number
  ) =>
  (...args: Parameters<FNType>) => {
    if (limit > 0) {
      limit--;
      return fn(...args);
    }
  };

export { thisManyTimes };
