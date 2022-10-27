if (!Array.prototype.flat) {
  Array.prototype.flat = function (n = 1) {
    this.flatAllX = () =>
      this.reduce(
        (f, v) =>
          f.concat(Array.isArray(v) ? v.flat(Infinity) : v),
        []
      );

    this.flatOneX = () =>
      this.reduce((f, v) => f.concat(v), []);

    return n === Infinity
      ? this.flatAllX()
      : n === 1
      ? this.flatOneX()
      : this.flatOneX().flat(n - 1);
  };
}

// SOLUTION TO EXERCISE
const better = apiAnswer
  .flatMap((c) =>
    c.states.map((s) => ({ ...s, country: c.name }))
  )
  .flatMap((s) =>
    s.cities.map((t) => ({
      ...t,
      state: s.name,
      country: s.country,
    }))
  )
  .map((t) => `${t.name}, ${t.state}, ${t.country}`);
/*
[ 'Lincoln, Buenos Aires, Argentine',
  'Lincoln, England, Great Britain',
  'Lincoln, California, United States of America',
  'Lincoln, Rhode Island, United States of America',
  'Lincolnia, Virginia, United States of America',
  'Lincoln Park, Michigan, United States of America',
  'Lincoln, Nebraska, United States of America',
  'Lincoln Park, Illinois, United States of America',
  'Lincoln Square, Illinois, United States of America' ]
*/

// SOLUTION TO EXERCISE
const words = gettysburg.join(" ").split(" ").length; // again not 272
