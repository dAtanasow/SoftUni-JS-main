import { expect } from "chai";
import { isOddOrEven } from "./evenOrOdd.js";

describe('', () => {
    it('no string should be undefined', () => {
        expect(isOddOrEven(1)).to.equal(undefined)
    })
    it('should be odd', () => {
        expect(isOddOrEven('paint')).to.equal('odd')
    })
    it("should be even", () => {
        expect(isOddOrEven('toyota')).to.equal('even')
    })
})