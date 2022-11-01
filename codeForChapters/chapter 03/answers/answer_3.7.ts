/* eslint-disable @typescript-eslint/no-this-alias */

type AnyObject = Record<string, unknown>;

Function.prototype.bind =
  Function.prototype.bind ||
  function (context: AnyObject, ...args1: unknown[]) {
    const that = this;
    return function (...args2: unknown[]) {
      return that.apply(context, [...args1, ...args2]);
    };
  };

Function.prototype.bind ||= function (
  context: AnyObject,
  ...args1: unknown[]
) {
  return (...args2: unknown[]) =>
    this.apply(context, [...args1, ...args2]);
};

type Person = {
  first: string;
  last: string;
};

function printName(
  this: Person,
  year: number,
  born: number
) {
  console.log(
    `${this.first} ${this.last} is ${
      year - born
    } years old in ${year}`
  );
  return year - born;
}

const person = { first: "F", last: "K" };
const call = printName.bind(person, 2022);
console.log(call(1960));

export {};
