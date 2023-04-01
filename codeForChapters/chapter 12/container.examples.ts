import { Container } from "./container";

const num1 = new Container(22);
console.log(num1.map((x: number): number => x));
console.log(num1.toString());

const num2 = Container.of("FK");
console.log(num2.toString());
