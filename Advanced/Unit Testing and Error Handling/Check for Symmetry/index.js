import { expect } from 'chai';
import { isSymmetric } from './check.js';

describe("Test", () => {
    it("should return true if the array is symmetric", () => {
        expect(isSymmetric([1, 2, 3, 2, 1])).to.be.true
        expect(isSymmetric(['a', 'b', 'c', 'b', 'a'])).to.be.true
    })
    it("should be symmetric with empty array", () => {
        expect(isSymmetric([])).to.be.true
    })
    it("should be symmetric with one element array", () => {
        expect(isSymmetric([1])).to.be.true
    })
    it("should return false if the input array is not symmetric", () => {
        expect(isSymmetric([1, 2, 3, 4])).to.be.false
        expect(isSymmetric(['a', 'b', 'c', 'd'])).to.be.false;
    })
    it("should return false for any input that is not an array", () => {
        expect(isSymmetric('abc')).to.be.false
        expect(isSymmetric(123)).to.be.false
        expect(isSymmetric({ key: 'value' })).to.be.false
    })

})