type AccountData = {
  id: string;
  balance: number;
};

const serviceResult = {
  accountsData: [
    {
      id: "F220960K",
      balance: 1024,
    },
    {
      id: "S120456T",
      balance: 2260,
    },
    {
      id: "J140793A",
      balance: -38,
    },
    {
      id: "M120396V",
      balance: -114,
    },
    {
      id: "A120289L",
      balance: 55000,
    },
  ],
};

const delinquent = serviceResult.accountsData.filter(
  (v) => v.balance < 0
);
console.log(delinquent);

const notDelinquent = serviceResult.accountsData.filter(
  (v) => v.balance >= 0
);
console.log(notDelinquent);

const notDelinquent2 = serviceResult.accountsData.filter(
  (v) => !(v.balance < 0)
);
console.log(notDelinquent2);

const isNegativeBalance = (v: AccountData) => v.balance < 0;

const delinquent2 = serviceResult.accountsData.filter(
  isNegativeBalance
);
console.log(delinquent2);

/*

const not = (fn) => (...args) => !fn(...args);

*/

const not =
  <T extends (...args: any[]) => boolean>(fn: T) =>
  (...args: Parameters<T>): boolean =>
    !fn(...args);

const notDelinquent3 = serviceResult.accountsData.filter(
  not(isNegativeBalance)
);
console.log(notDelinquent3);

/*

const filterNot = (arr) => (fn) => arr.filter(not(fn));

*/

const filterNot =
  <A, T extends (x: A) => boolean>(arr: A[]) =>
  (fn: T): A[] =>
    arr.filter(not((y) => fn(y)));

export { not, filterNot };
