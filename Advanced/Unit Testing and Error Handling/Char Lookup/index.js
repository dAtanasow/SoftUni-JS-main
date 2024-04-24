import { expect } from "chai";
import { lookupChar } from "./charLookup.js";

describe('', () => {
    it('should be undefined', () => {
        expect(lookupChar(1, 1)).to.equal(undefined)
        expect(lookupChar('1', 1.1)).to.equal(undefined)
    })
    it('correct index', () => {
        expect(lookupChar('1', 1)).to.equal("Incorrect index")
        expect(lookupChar('one', -1)).to.equal("Incorrect index")
    })
    it('charAt from index', () => {
        expect(lookupChar('one', 1)).to.equal('n')
    })
})