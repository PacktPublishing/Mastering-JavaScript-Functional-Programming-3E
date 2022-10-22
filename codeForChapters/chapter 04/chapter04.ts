const sum3 = (x: number, y: number, z: number): number =>
  x + y + z;

const x = {};
x.valueOf = Math.random;

const y = 1;
const z = 2;

console.log(sum3(x, y, z)); // 3.2034400919849431
console.log(sum3(x, y, z)); // 3.8537045249277906
console.log(sum3(x, y, z)); // 3.0833258308458734

export {};
