const promiseThrottle = <
  A,
  T extends (...x: any[]) => Promise<A>
>(
  fn: T,
  delay = 300_000 /* 5 minutes */
): ((...x: Parameters<T>) => Promise<A>) => {
  const cache = {} as Record<string, Promise<A>>;
  const timers = {} as Record<
    string,
    ReturnType<typeof setTimeout>
  >;
  return (...args) => {
    const strX = JSON.stringify(args);
    if (!(strX in timers)) {
      timers[strX] = setTimeout(() => {
        delete cache[strX];
        delete timers[strX];
      }, delay);
    }
    return strX in cache
      ? cache[strX]
      : (cache[strX] = fn(...args).catch((x) => {
          delete cache[strX];
          delete timers[strX];
          return x;
        }));
  };
};

export { promiseThrottle };
