import type { FN } from "../common";

const traverseDom = (node: Element, depth = 0) => {
  console.log(
    `${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`
  );
  for (let i = 0; i < node.children.length; i++) {
    traverseDom(node.children[i], depth + 1);
  }
};

const traverseDom2 = (node: Element, depth = 0) => {
  console.log(
    `${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`
  );
  Array.from(node.children).forEach((child) =>
    traverseDom2(child, depth + 1)
  );
};

const traverseDom3 = (node: Element, depth = 0): void => {
  console.log(
    `${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`
  );
  const traverseChildren = (
    children: Element[],
    i = 0
  ): void => {
    if (i < children.length) {
      traverseDom3(children[i], depth + 1);
      return traverseChildren(children, i + 1); // loop
    }
    return;
  };
  return traverseChildren(Array.from(node.children));
};

const traverseDom3C = (
  node: Element,
  depth = 0,
  cont: FN = () => {
    /*  nothing */
  }
): void => {
  console.log(
    `${"| ".repeat(depth)}<${node.nodeName.toLowerCase()}>`
  );
  const traverseChildren = (
    children: Element[],
    i = 0
  ): void => {
    if (i < children.length) {
      return traverseDom3C(children[i], depth + 1, () =>
        traverseChildren(children, i + 1)
      );
    }
    return cont();
  };
  return traverseChildren(Array.from(node.children));
};

export {};
