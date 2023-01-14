const partition = <A>(
  arr: A[],
  fn: (x: A) => boolean
): [A[], A[]] =>
  arr.reduce(
    (result: [A[], A[]], elem: A) => {
      result[fn(elem) ? 0 : 1].push(elem);
      return result;
    },
    [[], []]
  );

export { partition };
