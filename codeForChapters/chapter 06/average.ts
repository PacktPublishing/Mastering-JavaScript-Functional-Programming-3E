declare global {
  // eslint-disable @typescript-eslint/no-unused-vars
  interface Array<T> {
    average(this: number[]): number;
  }
}

Array.prototype.average = function () {
  return (
    this.reduce((x: number, y: number) => x + y, 0) /
    this.length
  );
};

const myAvg = [22, 9, 60, 12, 4, 56].average(); // 27.166667
console.log(myAvg);

/*
  console.log([1, 2, 3, 4].average()); // this is OK
  console.log(["a", "b"].average()); // this is not OK
  */

export {};
