// VARIADIC TYPES

const promisify =
  <E, T extends any[], D>(
    fn: (...args: [...T, (err: E, data: D) => void]) => void
  ) =>
  (...args: T): Promise<D> =>
    new Promise((resolve, reject) =>
      fn(...args, (err: E, data: D) =>
        err ? reject(err) : resolve(data)
      )
    );

export { promisify };
