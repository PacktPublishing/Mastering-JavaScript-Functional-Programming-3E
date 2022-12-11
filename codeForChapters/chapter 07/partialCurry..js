function partialCurryByBind(fn) {
  return fn.length === 0
    ? fn()
    : (...x) => partialCurryByBind(fn.bind(null, ...x));
}

const partialCurryByClosure = (fn) => {
  const curryize =
    (...args1) =>
    (...args2) => {
      const allParams = [...args1, ...args2];
      return allParams.length < fn.length
        ? curryize(...allParams)
        : fn(...allParams);
    };

  return curryize();
};

export { partialCurryByBind, partialCurryByClosure };
