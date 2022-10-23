const getRandomLetter = (): string => {
  const min = "A".charCodeAt(0);
  const max = "Z".charCodeAt(0);
  return String.fromCharCode(
    Math.floor(Math.random() * (1 + max - min)) + min
  );
};

const getRandomLetter2 = (
  getRandomNum: () => number = Math.random
): string => {
  const min = "A".charCodeAt(0);
  const max = "Z".charCodeAt(0);
  return String.fromCharCode(
    Math.floor(getRandomNum() * (1 + max - min)) + min
  );
};

const getRandomFileName = (fileExtension = ""): string => {
  const NAME_LENGTH = 12;
  const namePart = new Array(NAME_LENGTH);
  for (let i = 0; i < NAME_LENGTH; i++) {
    namePart[i] = getRandomLetter();
  }
  return namePart.join("") + fileExtension;
};

console.log(getRandomFileName(".pdf")); // "SVHSSKHXPQKG.pdf"
console.log(getRandomFileName(".pdf")); // "DCHKTMNWFHYZ.pdf"
console.log(getRandomFileName(".pdf")); // "GBTEFTVVHADO.pdf"
console.log(getRandomFileName(".pdf")); // "ATCBVUOSXLXW.pdf"
console.log(getRandomFileName(".pdf")); // "OIFADZKKNVAH.pdf"

const getRandomFileName2 = (
  fileExtension = "",
  randomLetterFunc: () => string
): string => {
  const NAME_LENGTH = 12;

  const namePart = new Array(NAME_LENGTH);
  for (let i = 0; i < NAME_LENGTH; i++) {
    namePart[i] = randomLetterFunc();
  }
  return namePart.join("") + fileExtension;
};

const getRandomFileName3 = (
  fileExtension = "",
  randomLetterFunc: () => string = getRandomLetter2
): string => {
  const NAME_LENGTH = 12;

  const namePart = new Array(NAME_LENGTH);
  for (let i = 0; i < NAME_LENGTH; i++) {
    namePart[i] = randomLetterFunc();
  }
  return namePart.join("") + fileExtension;
};

export {
  getRandomLetter,
  getRandomLetter2,
  getRandomFileName,
  getRandomFileName2,
  getRandomFileName3,
};
