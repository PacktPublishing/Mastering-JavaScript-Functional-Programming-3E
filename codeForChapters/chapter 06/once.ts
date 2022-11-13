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

*/

function once<T extends (...args: any[]) => void>(
  f: T
): (...args: Parameters<T>) => void {
  let done = false;

  return ((...args: Parameters<T>) => {
    if (!done) {
      done = true;
      f(...args);
    }
  }) as T;
}

function once2<T extends (...args: any[]) => any>(
  f: T
): (...args: Parameters<T>) => ReturnType<T> {
  let done = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!done) {
      done = true;
      result = f(...args);
    }
    return result;
  }) as T;
}

function onceAndAfter<T extends (...args: any[]) => any>(
  f: T,
  g: T
): (...args: Parameters<T>) => ReturnType<T> {
  let done = false;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!done) {
      done = true;
      return f(...args);
    } else {
      return g(...args);
    }
  }) as T;
}

function onceAndAfter2<T extends (...args: any[]) => any>(
  f: T,
  g: T
): (...args: Parameters<T>) => ReturnType<T> {
  let toCall = f;

  return ((...args: Parameters<T>): ReturnType<T> => {
    const result = toCall(...args);
    toCall = g;
    return result;
  }) as T;
}

const squeak = (x: string) => console.log(x, "squeak!!");
const creak = (x: string) => console.log(x, "creak!!");
const makeSound = onceAndAfter2(squeak, creak);
makeSound("door"); // "door squeak!!"
makeSound("door"); // "door creak!!"
makeSound("door"); // "door creak!!"
makeSound("door"); // "door creak!!"

/*


  const squeak = (x) => console.log(x, "squeak!!");
  const creak = (x) => console.log(x, "creak!!");
  const makeSound = onceAndAfter2(squeak, creak);
  makeSound("door"); // "door squeak!!"
  makeSound("door"); // "door creak!!"
  makeSound("door"); // "door creak!!"
  makeSound("door"); // "door creak!!"

  */

export { once, once2, onceAndAfter, onceAndAfter2 };
