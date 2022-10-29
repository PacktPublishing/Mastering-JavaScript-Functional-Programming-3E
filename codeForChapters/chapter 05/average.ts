const myArray = [22, 9, 60, 12, 4, 56];

const sum = (x: number, y: number): number => x + y;

const average = (arr: number[]): number =>
  arr.reduce(sum, 0) / arr.length;
console.log(average(myArray)); // 27.166667

const sumOrDivide = (
  sum: number,
  val: number,
  ind: number,
  arr: number[]
) => {
  sum += val;
  return ind == arr.length - 1 ? sum / arr.length : sum;
};

const average2 = (arr: number[]): number =>
  arr.reduce(sumOrDivide, 0);
console.log(average2(myArray)); // 27.166667

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    average(): number;
  }
}

Array.prototype.average = function () {
  return this.reduce((x, y) => x + y, 0) / this.length;
};
const myAvg = [22, 9, 60, 12, 4, 56].average(); // 27.166667
console.log(myAvg);

const average3 = (arr: number[]): number => {
  const sc = arr.reduce(
    (ac, val) => ({
      sum: val + ac.sum,
      count: ac.count + 1,
    }),
    { sum: 0, count: 0 }
  );
  return sc.sum / sc.count;
};
console.log(average3(myArray)); // 27.166667

const average4 = (arr: number[]) => {
  const sc = arr.reduce(
    (ac, val) => [ac[0] + val, ac[1] + 1],
    [0, 0]
  );
  return sc[0] / sc[1];
};
console.log(average4(myArray)); // 27.166667

const markers = [
  { name: "AR", lat: -34.6, lon: -58.4 },
  { name: "BO", lat: -16.5, lon: -68.1 },
  { name: "BR", lat: -15.8, lon: -47.9 },
  { name: "CL", lat: -33.4, lon: -70.7 },
  { name: "CO", lat: 4.6, lon: -74.0 },
  { name: "EC", lat: -0.3, lon: -78.6 },
  { name: "PE", lat: -12.0, lon: -77.0 },
  { name: "PY", lat: -25.2, lon: -57.5 },
  { name: "UY", lat: -34.9, lon: -56.2 },
  { name: "VE", lat: 10.5, lon: -66.9 },
];

const averageLat = average(markers.map((x) => x.lat));
const averageLon = average(markers.map((x) => x.lon));
console.log(averageLat, averageLon); // -15.76, -65.53

const averageLat2 = markers.map((x) => x.lat).average();
const averageLon2 = markers.map((x) => x.lon).average();
console.log(averageLat2, averageLon2);

export { markers };
