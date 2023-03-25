const demethodize1 =
  <T extends (_arg0: any, ..._args: any[]) => any>(fn: T) =>
  (_arg0: any, ..._args: Parameters<T>) =>
    fn.apply(_arg0, _args);

const demethodize2 =
  <T extends (_arg0: any, ..._args: any[]) => any>(fn: T) =>
  (_arg0: any, ..._args: Parameters<T>): ReturnType<T> =>
    fn.call(_arg0, ..._args);

const demethodize3 =
  <T extends (_arg0: any, ..._args: any[]) => any>(fn: T) =>
  (_arg0: any, ..._args: Parameters<T>): ReturnType<T> =>
    fn.bind(_arg0, ..._args)();

export { demethodize1, demethodize2, demethodize3 };
