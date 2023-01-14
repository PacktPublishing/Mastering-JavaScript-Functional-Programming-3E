const reverse = (str: string): string =>
  str.length === 0 ? "" : reverse(str.slice(1)) + str[0];

console.log(reverse("MONTEVIDEO"));

export {};
