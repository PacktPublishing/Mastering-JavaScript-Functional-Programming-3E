/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Monad } from "./monad";
const add = (x: number) => (y: number) => x + y; // or curry((x,y) => x+y)
const something = Monad.of(2).map(add);

const monad5 = something.ap(Monad.of(3)); // Monad(5)
console.log(monad5, monad5.toString());
