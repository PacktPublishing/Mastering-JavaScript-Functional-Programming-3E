// partialCurry!

function curry(fn) {
  return fn.length === 0
    ? fn()
    : (...x) => curry(fn.bind(null, ...x));
}

const getFieldP = curry((attr, obj) =>
  obj && attr in obj ? obj[attr] : undefined
);

const setFieldP = curry((attr, value, obj) =>
  obj && attr in obj
    ? { ...obj, [attr]: value }
    : { ...obj }
);

export {};
