// Write tests to check the functionality of the following code:
// checkForSymmetry.js
// function isSymmetric(arr) {
//     if (!Array.isArray(arr)){
//         return false; // Non-arrays are non-symmetric
//     }
//     let reversed = arr.slice(0).reverse(); // Clone and reverse
//     let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
//     return equal;
// }
// Your tests will be supplied with a function named 'isSymmetric()'. It should meet the following requirements:
// Take an array as an argument
// Return false for any input that isn’t of the correct type
// Return true if the input array is symmetric
// Otherwise, return false

import { expect } from 'chai';
import { isSymmetric } from './check.js';

describe("Test isSymmetric", () => {
    it("should return true if the array is symmetric", () => {
        expect(isSymmetric([1, 2, 3, 2, 1])).to.be.true
        expect(isSymmetric(['a', 'b', 'c', 'b', 'a'])).to.be.true
        expect(isSymmetric([1,2,2,1])).to.be.true
        expect(isSymmetric([1,1,1])).to.be.true
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