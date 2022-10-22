import {
  getRandomLetter,
  getRandomLetter2,
  getRandomFileName,
  getRandomFileName3,
} from "./random";

describe("getRandomLetter2", function () {
  it("returns A for values close to 0", () => {
    const letterSmall = getRandomLetter2(() => 0.0001);
    expect(letterSmall).toBe("A");
  });

  it("returns Z for values close to 1", () => {
    const letterBig = getRandomLetter2(() => 0.99999);
    expect(letterBig).toBe("Z");
  });

  it("returns middle letter for values around 0.5", () => {
    const letterMiddle = getRandomLetter2(() => 0.49384712);
    expect(letterMiddle > "G").toBeTruthy();
    expect(letterMiddle < "S").toBeTruthy();
  });

  it("returns ascending letters for ascending #s", () => {
    const letter1 = getRandomLetter2(() => 0.09);
    const letter2 = getRandomLetter2(() => 0.22);
    const letter3 = getRandomLetter2(() => 0.6);
    expect(letter1 < letter2).toBeTruthy();
    expect(letter2 < letter3).toBeTruthy();
  });
});

describe("getRandomFileName3", function () {
  let a: string[] = [];
  const f = () => a.shift() as string;

  beforeEach(() => {
    a = "SORTOFRANDOM".split("");
  });

  it("uses the given letters for the file name", () => {
    const fileName = getRandomFileName3("", f);
    expect(fileName.startsWith("SORTOFRANDOM")).toBe(true);
  });

  it("includes right extension, has right length", () => {
    const fileName = getRandomFileName3(".pdf", f);
    expect(fileName.endsWith(".pdf")).toBe(true);
    expect(fileName.length).toBe(16);
  });
});

describe("getRandomLetter", function () {
  afterEach(() => {
    // so count of calls to Math.random will be OK
    jest.restoreAllMocks();
  });

  it("returns A for values ~ 0", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.00001);
    const letterSmall = getRandomLetter();
    expect(Math.random).toHaveBeenCalled();
    expect(letterSmall).toBe("A");
  });

  it("returns Z for values ~ 1", () => {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.988)
      .mockReturnValueOnce(0.999);
    const letterBig1 = getRandomLetter();
    const letterBig2 = getRandomLetter();
    expect(Math.random).toHaveBeenCalledTimes(2);
    expect(letterBig1).toBe("Z");
    expect(letterBig2).toBe("Z");
  });

  it("returns middle letter for values ~ 0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.49384712);
    const letterMiddle = getRandomLetter();
    expect(Math.random).toHaveBeenCalledTimes(1);
    expect(letterMiddle > "G").toBeTruthy();
    expect(letterMiddle < "S").toBeTruthy();
  });
});

describe("getRandomFileName+impure getRandomLetter", () => {
  it("generates 12 letter long names", () => {
    for (let i = 0; i < 100; i++) {
      expect(getRandomFileName().length).toBe(12);
    }
  });

  it("generates names with letters A to Z, only", () => {
    for (let i = 0; i < 100; i++) {
      const name = getRandomFileName();
      for (let j = 0; j < name.length; j++) {
        expect(name[j] >= "A" && name[j] <= "Z").toBe(true);
      }
    }
  });

  it("includes right extension if provided", () => {
    const fileName1 = getRandomFileName(".pdf");
    expect(fileName1.length).toBe(16);
    expect(fileName1.endsWith(".pdf")).toBe(true);
  });

  it("doesn't include extension if not provided", () => {
    const fileName2 = getRandomFileName();
    expect(fileName2.length).toBe(12);
    expect(fileName2.includes(".")).toBe(false);
  });
});
