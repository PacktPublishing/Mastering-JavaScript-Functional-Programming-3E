const setField = <D>(
  attr: keyof D,
  value: any,
  obj: D
) => ({
  ...obj,
  [attr]: value,
});

const myObj = {
  name: {
    first: "Federico",
    last: "Kereki",
  },
  country: "India",
};
const myObj1 = setField("country", "Uruguay", myObj);
console.log(myObj1);

const deepCopy = (o: any) => o; // fake version!

const setField2 = <D>(
  attr: keyof D,
  value: any,
  obj: D
) => ({
  ...deepCopy(obj),
  [attr]: value,
});

/*
const setByPath = (arr, value, obj) => {
  if (!(arr[0] in obj)) {
    obj[arr[0]] =
      arr.length === 1
        ? null
        : Number.isInteger(arr[1])
        ? []
        : {};
  }
  if (arr.length > 1) {
    return setByPath(arr.slice(1), value, obj[arr[0]]);
  } else {
    obj[arr[0]] = value;
    return obj;
  }
};

const setField2 = (attr, value, obj) =>
  setByPath([attr], value, obj);

const myObj2 = setField2("country", "Uruguay", myObj);
console.log(myObj2);

*/
export { setField, setField2 };
