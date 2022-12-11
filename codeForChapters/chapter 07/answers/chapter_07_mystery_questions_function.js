const partial =
  (fn) =>
  (...params) =>
    fn.length <= params.length
      ? fn(...params)
      : (...otherParams) =>
          partial(fn)(...params, ...otherParams);

export { partial };
