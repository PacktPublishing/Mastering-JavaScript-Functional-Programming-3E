type data = {
  name: string;
  age: number;
  isMarried: boolean;
  birth: Date;
  numbers: number[]; // OJO! debería ser un array...
  setIt(x: number): void;
  getAge(p: number, q: string): number;
};

type VALIDIFY<A extends { [key: string]: any }> = {
  [key in keyof A]?: string;
};

type rrr = VALIDIFY<data>;
/*

type rrr = {
    name?: string | undefined;
    age?: string | undefined;
    isMarried?: string | undefined;
    birth?: string | undefined;
}

*/

type CHAINIFY<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends (...args: any[]) => any
    ? void extends ReturnType<A[key]>
      ? (...args: Parameters<A[key]>) => CHAINIFY<A>
      : (...args: Parameters<A[key]>) => ReturnType<A[key]>
    : A[key];
};

type sss = CHAINIFY<data>;
