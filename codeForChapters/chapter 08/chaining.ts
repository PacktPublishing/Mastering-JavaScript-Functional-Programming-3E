type Chainify<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends (...args: any[]) => any
    ? void extends ReturnType<A[key]>
      ? (...args: Parameters<A[key]>) => Chainify<A>
      : (...args: Parameters<A[key]>) => ReturnType<A[key]>
    : A[key];
};

/* Alternative:

type Chainify<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends (...args: any[]) => any
    ? (
        ...args: Parameters<A[key]>
      ) => void extends ReturnType<A[key]>
        ? Chainify<A>
        : ReturnType<A[key]>
    : A[key];
};
*/

const chainify = <OBJ extends { [key: string]: any }>(
  obj: OBJ
): Chainify<OBJ> =>
  new Proxy(obj, {
    get(target, property, receiver) {
      if (typeof property === "string") {
        if (typeof target[property] === "function") {
          // requesting a method? return a wrapped version
          return (...args: any[]) => {
            const result = target[property](...args);
            return result === undefined ? receiver : result;
          };
        } else {
          // an attribute was requested - just return it
          return target[property];
        }
      } else {
        return Reflect.get(target, property, receiver);
      }
    },
  });

export { chainify };
export type { Chainify };
