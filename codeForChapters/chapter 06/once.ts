const once = <T extends (...x: any[]) => void>(
  func: T
): ((...x: Parameters<T>) => void) => {
  let done = false;
  return (...args) => {
    if (!done) {
      done = true;
      func(...args);
    }
  };
};

const once2 = (func) => {
  let done = false;
  let result;
  return (...args) => {
    if (!done) {
      done = true;
      result = func(...args);
    }
    return result;
  };
};
/*



  const onceAndAfter = (f, g) => {
    let done = false;
    return (...args) => {
      if (!done) {
        done = true;
        return f(...args);
      } else {
        return g(...args);
      }
    };
  };

  const onceAndAfter2 = (f, g) => {
    let toCall = f;
    return (...args) => {
      let result = toCall(...args);
      toCall = g;
      return result;
    };
  };

  const squeak = (x) => console.log(x, "squeak!!");
  const creak = (x) => console.log(x, "creak!!");
  const makeSound = onceAndAfter2(squeak, creak);
  makeSound("door"); // "door squeak!!"
  makeSound("door"); // "door creak!!"
  makeSound("door"); // "door creak!!"
  makeSound("door"); // "door creak!!"

  */

export { once, once2 };
