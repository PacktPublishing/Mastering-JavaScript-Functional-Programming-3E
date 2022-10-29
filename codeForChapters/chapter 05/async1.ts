const fakeAPI = <T>(delay: number, value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), delay)
  );

const useResult = (x: any): void =>
  console.log(new Date(), x);

(async () => {
  console.log("START");
  console.log(new Date());
  const result = await fakeAPI(1000, 229);
  useResult(result);
  console.log("END");
})();

/*
START
2022-10-29T01:28:12.986Z
2022-10-29T01:28:13.989Z 229
END
*/

export {};
