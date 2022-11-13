const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay = 1000
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export { debounce };
