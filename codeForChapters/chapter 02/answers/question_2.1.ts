const once = <FNType extends (...args: any[]) => any>(
  fn: FNType | null
) =>
  ((...args: Parameters<FNType>) => {
    fn && fn(...args);
    fn = null;
  }) as FNType;

export { once };
