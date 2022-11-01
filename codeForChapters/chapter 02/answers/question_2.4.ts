const onceIfSuccess = <
  FNType extends (...args: any[]) => any
>(
  fn: FNType
) => {
  let done = false;

  return ((...args: Parameters<FNType>) => {
    if (!done) {
      done = true;
      try {
        return fn(...args);
      } catch (e) {
        done = false;
        throw e;
      }
    }
  }) as FNType;
};

export { onceIfSuccess };
