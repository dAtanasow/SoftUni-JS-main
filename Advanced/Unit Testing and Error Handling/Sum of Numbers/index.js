import { expect } from "chai";
import { sumArr } from "./sum.js";

describe("Suite", function () {
    it("is one element array", () => {
        expect(sumArr([1])).to.equal(1);
    });
    it("sum is correct", () => {
        const arr = [1, 1, 1];
        expect(sumArr(arr)).to.equal(3);
    });
    it("return 0 for empty array", () => {
        expect(sumArr([])).to.equal(0);
    });
    it("throws error for non-array", () => {
        expect(() => sumArr(1)).to.throw();
    });
});
