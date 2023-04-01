import { chainify } from "./chaining";

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

const myCity = new City(
  "Montevideo, Uruguay",
  -34.9011,
  -56.1645
);
console.log(myCity.getCoords(), myCity.getName());
// [ -34.9011, -56.1645 ] 'Montevideo, Uruguay'

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
