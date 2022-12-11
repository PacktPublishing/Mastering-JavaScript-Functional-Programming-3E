// P stands for the parameter types
// A stands for the argument types
/*
type Partialize<
  P extends any[],
  A extends any[]
> = 0 extends P["length"]
  ? []
  : 0 extends A["length"]
  ? P
  : [P, A] extends [
      [infer PH, ...infer PT],
      [infer AH, ...infer AT]
    ]
  ? AH extends undefined
    ? [PH, ...Partialize<PT, AT>]
    : [...Partialize<PT, AT>]
  : never;

*/

type Partialize<
  P extends any[],
  A extends any[]
> = 0 extends P["length"]
  ? []
  : 0 extends A["length"]
  ? P
  : [P, A] extends [
      [infer PH, ...infer PT],
      [infer AH, ...infer AT]
    ]
  ? AH extends undefined
    ? [PH, ...Partialize<PT, AT>]
    : PH extends AH
    ? [...Partialize<PT, AT>]
    : never
  : never;

type p00 = Partialize<
  [boolean, number, string],
  [undefined, undefined, undefined]
>; // [boolean, number, string]

type p01 = Partialize<
  [boolean, number, string],
  [boolean, undefined, undefined]
>; // [number, string]

type p02 = Partialize<
  [boolean, number, string],
  [undefined, string, undefined]
>; // [boolean, string]

type p03 = Partialize<
  [boolean, number, string],
  [undefined, undefined, string]
>; // [boolean, number]

type p04 = Partialize<
  [boolean, number, string],
  [boolean, undefined, string]
>; // [number]

type p05 = Partialize<[boolean, number, string], [boolean]>;
// [number, string]

type p06 = Partialize<[boolean, number, string], []>;
// [boolean, number, string]

type TypesMatch<
  P extends any[],
  A extends any[]
> = 0 extends P["length"]
  ? boolean
  : 0 extends A["length"]
  ? boolean
  : [P, A] extends [
      [infer PH, ...infer PT],
      [infer AH, ...infer AT]?
    ]
  ? AH extends undefined
    ? TypesMatch<PT, AT>
    : PH extends AH
    ? TypesMatch<PT, AT>
    : never
  : never;

type Partial<P extends any[], R> = <A extends any[]>(
  ...x: A
) => TypesMatch<P, A> extends never
  ? never
  : P extends any[]
  ? 0 extends Partialize<P, A>["length"]
    ? (...x: [...P]) => R
    : Partial<Partialize<P, A>, R>
  : never;

/*
EJERCICIO -- cambiar el return al viejo estilo (el del libro)


function partialOK<P extends any[], R>(
  fn: (...a: P) => R
): Partial<P, R>;
function partialOK(fn: (...a: any) => any) {
  const partialize =
    (...args1: any[]) =>
    (...args2: any[]) => {
      for (
        let i = 0;
        i < args1.length && args2.length;
        i++
      ) {
        if (args1[i] === undefined) {
          args1[i] = args2.shift();
        }
      }
      const allParams = [...args1, ...args2];
      return (
        allParams.includes(undefined) ||
          allParams.length < fn.length
          ? partialize
          : fn
      )(...allParams);
    };
  return partialize();
}
*/

function partial<P extends any[], R>(
  fn: (...a: P) => R
): Partial<P, R>;
function partial(fn: (...a: any) => any) {
  const partialize =
    (...args1: any[]) =>
    (...args2: any[]) => {
      for (
        let i = 0;
        i < args1.length && args2.length;
        i++
      ) {
        if (args1[i] === undefined) {
          args1[i] = args2.shift();
        }
      }
      const allParams = [...args1, ...args2];
      return allParams.includes(undefined) ||
        allParams.length < fn.length
        ? partialize(...allParams)
        : fn(...allParams);
    };
  return partialize();
}

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

const f0 = partial(make3);
const f1 = f0(undefined, 2);
const f2 = f1("A");
const f3 = f2("Z");
console.log(f3);

export { partial };
