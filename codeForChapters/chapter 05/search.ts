import { markers } from "./average";

const brazilData = markers.find((v) => v.name === "BR");
// {name:"BR", lat:-15.8, lon:-47.9}
console.log(brazilData);

const brazilIndex = markers.findIndex(
  (v) => v.name === "BR"
); // 2
console.log(brazilIndex);

const mexicoIndex = markers.findIndex(
  (v) => v.name === "MX"
); // -1
console.log(mexicoIndex);

markers.every((v) => v.lat < 0 && v.lon < 0); // false
markers.some((v) => v.lat < 0 && v.lon < 0); // true

const none = <T>(arr: T[], fn: (x: T) => boolean) =>
  arr.every((v) => !fn(v));

console.log(none(markers, (v) => v.lat < 0 && v.lon < 0)); // false

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    none(f: (x: T) => boolean): boolean;
  }
}

Array.prototype.none = function (fn) {
  return this.every((v) => !fn(v));
};

console.log(markers.none((v) => v.lat < 0 && v.lon < 0)); // false
