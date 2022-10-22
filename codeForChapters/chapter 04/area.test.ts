import { circleArea } from "./area";

describe("circle area", function () {
  it("is zero for radius 0", () => {
    const area = circleArea(0);
    expect(area).toBe(0);
  });

  it("is PI for radius 1", () => {
    expect(circleArea(1)).toBeCloseTo(Math.PI);
  });

  it("is approximately 12.5664 for radius 2", () =>
    expect(circleArea(2)).toBeCloseTo(12.5664));
});
