// Write tests to check the functionality of the following code:
// sumNumbers.js
// function sum(arr) {
//     let sum = 0;
//     for (let num of arr){
//         sum += Number(num);
//     }
//     return sum;
// }
// Your tests will be supplied with a function named 'sum()'. It should meet the following requirements:
// Take an array of numbers as an argument
// Return the sum of the values of all elements inside the array


import { expect } from "chai";
import { sumArr } from "./sum.js";

describe("Test sumArr", () => {
    it("is one element array", () => {
        expect(sumArr([1])).to.equal(1);
    });
    it("sum is correct", () => {
        expect(sumArr([1, 1, 1])).to.equal(3);
    });
    it("return 0 for empty array", () => {
        expect(sumArr([])).to.equal(0);
    });
    it("throws error for non-array", () => {
        expect(() => sumArr(1)).to.throw();
    });
});
