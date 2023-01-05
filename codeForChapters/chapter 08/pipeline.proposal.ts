function double(x: number) {
  return 2 * x;
}

function add1(y: number) {
  return y + 1;
}

function stringify(z: number) {
  return `${z}${z}${z}`;
}

console.log(4 |> double |> add1 |> stringify)

export {};

// npm install --save-dev @babel/plugin-proposal-pipeline-operator
// https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator
