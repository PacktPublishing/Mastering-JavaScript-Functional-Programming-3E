const serviceResult = {
  accountsData: [
    { id: "F220960K", balance: 1024 },
    { id: "S120456T", balance: 2260 },
    { id: "J140793A", balance: -38 },
    { id: "M120396V", balance: -114 },
    { id: "A120289L", balance: 55000 },
  ],
};

const delinquent = serviceResult.accountsData.filter(
  (v) => v.balance < 0
);
console.log(delinquent);
// two objects, with id's J140793A and M120396V

const delinquentIds = delinquent.map((v) => v.id);
console.log(delinquentIds);

const delinquentIds2 = serviceResult.accountsData
  .filter((v) => v.balance < 0)
  .map((v) => v.id);
console.log(delinquentIds2);

const myFilter = <T>(arr: T[], fn: (x: T) => boolean) =>
  arr.reduce(
    (x: T[], y: T) => (fn(y) ? x.concat(y) : x),
    []
  );

myFilter(serviceResult.accountsData, (v) => v.balance < 0);
// two objects, with id's J140793A and M120396V

export {};
