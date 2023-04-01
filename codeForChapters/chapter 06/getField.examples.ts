import { getField } from "./getField";

const sum = (x: number, y: number): number => x + y;

const average = (arr: number[]): number =>
  arr.reduce(sum, 0) / arr.length;

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

type NumFn = (...args: any[]) => number;

const averageLat2 = average(
  markers.map(getField("lat") as NumFn)
);
const averageLon2 = average(
  markers.map(getField("lon") as NumFn)
);
console.log(averageLat2, averageLon2);

const serviceResult = {
  accountsData: [
    { id: "F220960K", balance: 1024 },
    { id: "S120456T", balance: 2260 },
    { id: "J140793A", balance: -38 },
    { id: "M120396V", balance: -114 },
    { id: "A120289L", balance: 55000 },
  ],
};

const getId = getField("id") as (...args: any[]) => string;
const delinquent = serviceResult.accountsData.filter(
  (v) => v.balance < 0
);
const delinquentIds = delinquent.map(getId);
console.log(delinquentIds);

export { getField };
