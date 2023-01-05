import { chainify, City } from "./chaining";
import type { Chainify } from "./chaining";

let myCity: City;
let myCity2: Chainify<City>;

describe("chainify", function () {
  beforeEach(() => {
    myCity = new City(
      "Montevideo, Uruguay",
      -34.9011,
      -56.1645
    );
    myCity2 = chainify(myCity);
  });

  it("doesn't affect get functions", () => {
    expect(myCity2.getName()).toBe("Montevideo, Uruguay");
    expect(myCity2.getCoords()[0]).toBe(-34.9011);
    expect(myCity2.getCoords()[1]).toBe(-56.1645);
  });

  it("doesn't affect getting attributes", () => {
    expect(myCity2.name).toBe("Montevideo, Uruguay");
    expect(myCity2.lat).toBe(-34.9011);
    expect(myCity2.long).toBe(-56.1645);
  });

  it("returns itself from setting functions", () => {
    //    expect(myCity2.setName("Other name")).toBe(myCity2);
    expect(myCity2.setLat(11)).toBe(myCity2);
    expect(myCity2.setLong(22)).toBe(myCity2);
  });

  it("allows chaining", () => {
    const newCoords = myCity2
      .setName("Pune, India")
      .setLat(18.5626)
      .setLong(73.8087)
      .getCoords();

    expect(myCity2.name).toBe("Pune, India");
    expect(newCoords[0]).toBe(18.5626);
    expect(newCoords[1]).toBe(73.8087);
  });
});

export {};
