import { Maybe } from "./monadsMadeWithFunctions.0.mjs";

const client1 = Maybe.of({
  id: 1,
  name: "UNO",
  address: { city: "MVD", country: "UY" },
});
const client2 = Maybe.of({
  id: 2,
  name: "DOS",
  address: { city: "BA" },
});
const client3 = Maybe.of({
  id: 3,
  name: "TRES",
  address: { city: "MEX", country: "MX" },
});
const client4 = Maybe.of({
  id: 4,
  name: "CUATRO",
  address: {},
});
const client5 = Maybe.of({ id: 5, name: "CINCO" });

function codeToCountry(cc) {
  switch (cc) {
    case "UY":
      return "Uruguay";
    case "AR":
      return "Argentina";
    case "BR":
      return "Brasil";
  }
}

const attr = (field) => (object) =>
  object ? object[field] : null;

[client1, client2, client3, client4, client5].forEach(
  (ccc) =>
    ccc
      .map(attr("address"))
      .map(attr("country"))
      .map(codeToCountry)
      .orElse("--")
      .map(console.log)
);
