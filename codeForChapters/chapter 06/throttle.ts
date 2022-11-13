const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  delay = 1000
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>): void => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
      fn(...args);
    }
  };
};

export { throttle };
