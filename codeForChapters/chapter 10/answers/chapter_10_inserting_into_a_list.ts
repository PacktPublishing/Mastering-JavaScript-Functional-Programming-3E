type MUSICAL_KEY = string;

class Node {
  key: MUSICAL_KEY;
  next: Node | null;

  constructor(key: MUSICAL_KEY, next: Node | null) {
    this.key = key;
    this.next = next;
  }
}

type NODE_PTR = Node | null;

const insertAfter = (
  list: NODE_PTR,
  newKey: string,
  oldKey: string
): NODE_PTR => {
  if (list === null) {
    return null;
  } else if (list.key === oldKey) {
    return new Node(list.key, new Node(newKey, list.next));
  } else {
    return new Node(
      list.key,
      insertAfter(list.next, newKey, oldKey)
    );
  }
};

const c3 = new Node(
  "G",
  new Node(
    "B",
    new Node(
      "F",
      new Node("A", new Node("C", new Node("E", null)))
    )
  )
);

const newList = insertAfter(c3, "D", "B");

console.log(c3 === newList); // false
console.log(c3!.key === newList!.key); // true (both are "G")
console.log(c3!.next === newList!.next); // false
console.log(c3!.next!.key === newList!.next!.key); // true (both are "B")
console.log(c3!.next!.next === newList!.next!.next); // false
console.log(c3!.next!.next!.key === "F"); // true
console.log(newList!.next!.next!.key === "D"); // true
console.log(
  c3!.next!.next!.next === newList!.next!.next!.next!.next
); // true

export {};
