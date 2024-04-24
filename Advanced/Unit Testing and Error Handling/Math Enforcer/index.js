import { expect } from "chai";
import { mathEnforcer } from "./mathEnforcer.js";

describe('addFive', () => {
    it('should return correct result with non-number parameter', () => {
        expect(mathEnforcer.addFive('1')).to.be.undefined
        expect(mathEnforcer.addFive('test')).to.be.undefined
        expect(mathEnforcer.addFive(null)).to.be.undefined
        expect(mathEnforcer.addFive(undefined)).to.be.undefined
        expect(mathEnforcer.addFive([])).to.be.undefined
    })
    it('should return correct result with number parameter', () => {
        expect(mathEnforcer.addFive(1)).to.equal(6)
        expect(mathEnforcer.addFive(-1)).to.equal(4)
        expect(mathEnforcer.addFive(-6)).to.equal(-1)
    })
    it('should return correct result with floating-point numbers', () => {
        expect(mathEnforcer.addFive(1)).to.be.closeTo(6, 0.01)
        expect(mathEnforcer.addFive(-0.5)).to.equal(4.5)
        expect(mathEnforcer.addFive(0.5)).to.equal(5.5)
    })
})

describe('subtractTen', () => {
    it('should return correct result with non-number parameter', () => {
        expect(mathEnforcer.subtractTen('1')).to.be.undefined
        expect(mathEnforcer.subtractTen('test')).to.be.undefined
        expect(mathEnforcer.subtractTen(null)).to.be.undefined
        expect(mathEnforcer.subtractTen(undefined)).to.be.undefined
        expect(mathEnforcer.subtractTen([])).to.be.undefined
    })
    it('should return correct result with number parameter', () => {
        expect(mathEnforcer.subtractTen(1)).to.equal(-9)
        expect(mathEnforcer.subtractTen(-1)).to.equal(-11)
        expect(mathEnforcer.subtractTen(11)).to.equal(1)

    })
    it('should return correct result with floating-point numbers', () => {
        expect(mathEnforcer.subtractTen(11)).to.be.closeTo(1, 0.01)
        expect(mathEnforcer.subtractTen(10.5)).to.equal(0.5)
        expect(mathEnforcer.subtractTen(-0.5)).to.equal(-10.5)
        expect(mathEnforcer.subtractTen(5.5)).to.equal(-4.5)

    })
})

describe('sum', () => {
    it('should return correct result with non-number parameter', () => {
        expect(mathEnforcer.sum('1', 1)).to.be.undefined
        expect(mathEnforcer.sum(1, '1')).to.be.undefined
        expect(mathEnforcer.sum('1', '1')).to.be.undefined
        expect(mathEnforcer.sum('test', 1)).to.be.undefined
        expect(mathEnforcer.sum(1, 'test')).to.be.undefined
        expect(mathEnforcer.sum('test', 'test')).to.be.undefined
        expect(mathEnforcer.sum(null, 10)).to.be.undefined
        expect(mathEnforcer.sum(10, null)).to.be.undefined
        expect(mathEnforcer.sum(undefined, 1)).to.be.undefined
        expect(mathEnforcer.sum(1, undefined)).to.be.undefined
        expect(mathEnforcer.sum(null, undefined)).to.be.undefined
        expect(mathEnforcer.sum(undefined, null)).to.be.undefined
        expect(mathEnforcer.sum(undefined, undefined)).to.be.undefined
        expect(mathEnforcer.sum([], 1)).to.be.undefined
        expect(mathEnforcer.sum(1, [])).to.be.undefined
        expect(mathEnforcer.sum(null, [])).to.be.undefined
        expect(mathEnforcer.sum([], null)).to.be.undefined
        expect(mathEnforcer.sum([], undefined)).to.be.undefined
        expect(mathEnforcer.sum(undefined, [])).to.be.undefined
        expect(mathEnforcer.sum([], [])).to.be.undefined
    })
    it('should return correct result with number parameter', () => {
        expect(mathEnforcer.sum(1, 1)).to.equal(2)
        expect(mathEnforcer.sum(1, -1)).to.equal(0)
        expect(mathEnforcer.sum(-1, 1)).to.equal(0)
        expect(mathEnforcer.sum(-1, -1)).to.equal(-2)
    })
    it('should return correct result with floating-point numbers', () => {
        expect(mathEnforcer.sum(1, 1)).to.be.closeTo(2, 0.01)
        expect(mathEnforcer.sum(1.5, 1)).to.equal(2.5)
        expect(mathEnforcer.sum(1, 1.5)).to.equal(2.5)
        expect(mathEnforcer.sum(1.6, 1.6)).to.equal(3.2)
        expect(mathEnforcer.sum(-1, 0.5)).to.equal(-0.5)
        expect(mathEnforcer.sum(-0.5, -1)).to.equal(-1.5)
        expect(mathEnforcer.sum(-0.5, -0.5)).to.equal(-1)
    })
})