const sumMany = (total: number) => (value?: number) =>
  value === undefined ? total : sumMany(total + value);

// @ts-expect-error TS cannot figure types out here...
console.log(sumMany(2)(2)(9)(6)(0)(-3)()); // 16
