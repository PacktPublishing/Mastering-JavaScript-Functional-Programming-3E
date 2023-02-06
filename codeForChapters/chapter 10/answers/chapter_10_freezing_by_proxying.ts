import type { OBJ } from "../../common";

const proxySetAll = (obj: OBJ): OBJ => {
  Object.keys(obj).forEach((v) => {
    if (typeof obj[v] === "object") {
      obj[v] = proxySetAll(obj[v]);
    }
  });

  return new Proxy(obj, {
    set() {
      throw new Error("DON'T MODIFY ANYTHING IN ME");
    },
    deleteProperty() {
      throw new Error("DON'T DELETE ANYTHING IN ME");
    },
  }) as OBJ;
};

const myObj = proxySetAll({
  a: 5,
  b: 6,
  c: { d: 7, e: 8 },
});

myObj.a = 777; // Uncaught Error: DON'T MODIFY ANYTHING IN ME
myObj.f = 888; // Uncaught Error: DON'T MODIFY ANYTHING IN ME
delete myObj.b; // Uncaught Error: DON'T DELETE ANYTHING IN ME

export {};
