const not =
  <T extends (...args: any[]) => boolean>(fn: T) =>
  (...args: Parameters<T>): boolean =>
    !fn(...args);

const invert =
  <T extends (...args: any[]) => number>(fn: T) =>
  (...args: Parameters<T>): number =>
    -fn(...args);

export { not, invert };
