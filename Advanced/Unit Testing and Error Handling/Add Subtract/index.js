// Write tests to check the functionality of the following code:
// addSubtract.js
// function createCalculator() {
//     let value = 0;
//     return {
//         add: function(num) { value += Number(num); },
//         subtract: function(num) { value -= Number(num); },
//         get: function() { return value; }
//     }
// }
// Your tests will be supplied with a function named 'createCalculator()'. It should meet the following requirements:
// Return a module (object), containing the functions add(), subtract() and get() as properties
// Keep an internal sum that can’t be modified from the outside
// The functions add() and subtract() take a parameter that can be parsed as a number (either a number or a string containing a number) that is added or subtracted from the internal sum
// The function get() returns the value of the internal sum

import { expect } from "chai";
import { createCalculator } from "./calculator.js";

describe("Test calculator", () => {
    it("should return an object with methods add, subtract, get", () => {
        const calculator = createCalculator()
        expect(calculator).to.have.property('add').that.is.a('function')
        expect(calculator).to.have.property('subtract').that.is.a('function')
        expect(calculator).to.have.property('get').that.is.a('function')
    })
    it("should return a correct value", () => {
        const calculator = createCalculator()
        calculator.add(1)
        calculator.add(1)
        expect(calculator.get()).to.equal(2)
    })
    it("should handle string parameters that can be parsed as numbers", () => {
        const calculator = createCalculator()
        calculator.add('1')
        calculator.subtract('1')
        calculator.add('1')
        expect(calculator.get()).to.equal(1)
    })
    it("get() should returns the internal value", () => {
        const calculator = createCalculator();
        calculator.add('abc');
        calculator.subtract('xyz');
        expect(calculator.get()).to.be.NaN;
    })
})