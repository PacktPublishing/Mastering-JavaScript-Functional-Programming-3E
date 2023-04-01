import { not, filterNot } from "./not";

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

const notDelinquent3 = serviceResult.accountsData.filter(
  not(isNegativeBalance)
);
console.log(notDelinquent3);
