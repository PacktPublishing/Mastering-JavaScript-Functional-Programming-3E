class Maybe extends Promise {
  constructor(value) {
    if (value !== undefined && value !== null) {
      console.log("MAYBE - returning Just");
      return new Just(value);
    } else {
      console.log("MAYBE - returning Nothing");
      return new Nothing();
    }
  }
}

class Just extends Promise {
  constructor(value) {
    console.log("JUST CONSTRUCTOR1 ", value);
    super((resolve) => resolve(value));
    console.log("JUST CONSTRUCTOR2 ", value);
    this.value = value; // Store the value
  }

  then(fn) {
    console.log("THEN FOR JUST");
    return new Maybe(fn(this.value));
  }

  orElse() {
    console.log("ORELSE FOR JUST");
    return this; // Return the same promise
  }
}

class Nothing extends Promise {
  constructor() {
    console.log("NOTHING CONSTRUCTOR");
    super((resolve) => resolve());
  }

  then() {
    console.log("THEN FOR NOTHING");
    return this;
  }

  orElse(x) {
    console.log("ORELSE FOR NOTHING");
    return new Just(x); // Return a new Just with the provided value
  }
}

// Example usage:

const ppp = new Maybe(22);
console.log(ppp);

new Maybe(5)
  .then((x) => {
    console.log("THEN1", x);
    return x;
  })
  .orElse(22)
  .then((x) => {
    console.log("THEN2", x);
    return x;
  });

new Maybe(null)
  .then(() => console.log("Nothing"))
  .orElse(22)
  .then((x) => {
    console.log(x);
    return x;
  });
