class City {
  name: string;
  lat: number;
  long: number;
  extra: boolean;

  constructor(name: string, lat: number, long: number) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.extra = lat > 0;
  }

  getName() {
    return this.name;
  }

  setName(newName: string): void {
    this.name = newName;
  }

  setLat(newLat: number): void {
    this.lat = newLat;
  }

  setLong(newLong: number): void {
    this.long = newLong;
  }

  getCoords() {
    return [this.lat, this.long];
  }
}

/*
const myCity = new City(
  "Montevideo, Uruguay",
  -34.9011,
  -56.1645
);
console.log(myCity.getCoords(), myCity.getName());
// [ -34.9011, -56.1645 ] 'Montevideo, Uruguay'
*/

type Chainify<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends (...args: any[]) => any
    ? void extends ReturnType<A[key]>
      ? (...args: Parameters<A[key]>) => Chainify<A>
      : (...args: Parameters<A[key]>) => ReturnType<A[key]>
    : A[key];
};

/* Alternative:

type Chainify<A extends { [key: string]: any }> = {
  [key in keyof A]: A[key] extends (...args: any[]) => any
    ? (
        ...args: Parameters<A[key]>
      ) => void extends ReturnType<A[key]>
        ? Chainify<A>
        : ReturnType<A[key]>
    : A[key];
};
*/

const chainify = <OBJ extends { [key: string]: any }>(
  obj: OBJ
): Chainify<OBJ> =>
  new Proxy(obj, {
    get(target, property, receiver) {
      if (typeof property === "string") {
        if (typeof target[property] === "function") {
          // requesting a method? return a wrapped version
          return (...args: any[]) => {
            const result = target[property](...args);
            return result === undefined ? receiver : result;
          };
        } else {
          // an attribute was requested - just return it
          return target[property];
        }
      } else {
        return Reflect.get(target, property, receiver);
      }
    },
  });

/*
const myCity2 = chainify(myCity);

console.log(
  myCity2
    .setName("Pune, India")
    .setLat(18.5626)
    .setLong(73.8087)
    .getCoords(),
  myCity.getName()
);
// [ 18.5626, 73.8087 ] 'Pune, India'
*/

type xxx = Chainify<City>;

export { City, chainify };
export type { Chainify };
