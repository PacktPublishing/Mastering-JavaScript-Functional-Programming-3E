const demethodize1 =
  (fn: (..._args: any[]) => any) =>
  (arg0: any, ..._args: any[]) =>
    fn.apply(arg0, _args);

const demethodize2 =
  (fn: (..._args: any[]) => any) =>
  (arg0: any, ..._args: any[]) =>
    fn.call(arg0, ..._args);

const demethodize3 =
  (fn: (..._args: any[]) => any) =>
  (arg0: any, ..._args: any[]) =>
    fn.bind(arg0, ..._args)();

const demethodize = demethodize1;
export {
  demethodize,
  demethodize1,
  demethodize2,
  demethodize3,
};
