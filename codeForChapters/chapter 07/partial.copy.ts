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

type part1 = Partialize<
  [boolean, number, string],
  [undefined, undefined, undefined]
>; // boolean,number,string
type part2 = Partialize<
  [boolean | string, number, string],
  [undefined, number, undefined]
>; // boolean|string,string
type part3 = Partialize<
  [boolean | string, number, string],
  [boolean, undefined, string]
>; // number
type part4 = Partialize<
  [boolean, number, string],
  [boolean, number, string]
>; // empty!

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

type ok1 = TypesMatch<
  [boolean, number, string],
  [undefined, undefined, undefined]
>;
type ok2 = TypesMatch<
  [boolean, number | string, string],
  [boolean, undefined, string]
>;
type ok3 = TypesMatch<
  [boolean, number | string, string],
  [boolean, string, string]
>;
type bad1 = TypesMatch<
  [boolean, number, string],
  [undefined, string, number]
>;
type bad2 = TypesMatch<
  [boolean, number | string, string],
  [string, undefined, string]
>;
type bad3 = TypesMatch<
  [boolean, number | string, string],
  [boolean, boolean, string]
>;

type Partial<P extends any[], R> = <A extends any[]>(
  ...x: A
) => TypesMatch<P, A> extends never
  ? never
  : P extends any[]
  ? 0 extends Partialize<P, A>["length"]
    ? R
    : Partial<Partialize<P, A>, R>
  : never;

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

const nonsense = partial(function (
  a: number,
  b: string,
  c: boolean
) {
  return `${a}/${b}/${c}`;
});

const ns1 = nonsense(undefined, "9", undefined); // Partial<[number, boolean], string>
const ns2 = nonsense(22, "9", undefined); // Partial<[boolean], string>
const ns3 = nonsense(22, "9", true); //   string
console.log(ns3);
const ns4 = nonsense(
  undefined,
  "X",
  undefined
)(undefined, false);
const ns5 = ns4(10);
console.log(ns5);

export { partial };
export type { TypesMatch };
