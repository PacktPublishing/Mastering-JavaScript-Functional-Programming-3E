import { shuffle } from "../../chapter 04/shuffle";

const randomizer =
  <T extends (...x: any[]) => any>(...fns: T[]) =>
  (
    ...args: Parameters<T>
  ): ((...args: Parameters<T>) => ReturnType<T>) => {
    const first: T = fns.shift() as T;
    fns = shuffle(fns);
    fns.push(first);
    return fns[0](...args);
  };

const say1 = () => console.log(1);
const say22 = () => console.log(22);
const say333 = () => console.log(333);
const say4444 = () => console.log(4444);

const rrr = randomizer(say1, say22, say333, say4444);
rrr(); //333
rrr(); //4444
rrr(); //333
rrr(); //22
rrr(); //333
rrr(); //22
rrr(); //333
rrr(); //4444
rrr(); //1
rrr(); //4444
