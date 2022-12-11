type data = {
  name: string;
  age: number;
  isMarried: boolean;
  birth: Date;
  numbers: number[]; // OJO! debería ser un array...
};

type VALIDIFY<A extends { [key: string]: any }> = { [key in keyof A]?: string };

type rrr = VALIDIFY<data>;
/*

type rrr = {
    name?: string | undefined;
    age?: string | undefined;
    isMarried?: string | undefined;
    birth?: string | undefined;
}

*/
