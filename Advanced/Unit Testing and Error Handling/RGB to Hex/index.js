// Write tests to check the functionality of the following code:
// rgb-to-hex.js
// function rgbToHexColor(red, green, blue) {
//     if (!Number.isInteger(red) || (red < 0) || (red > 255)){
//         return undefined; // Red value is invalid
//     }
//     if (!Number.isInteger(green) || (green < 0) || (green > 255)){
//         return undefined; // Green value is invalid
//     }
//     if (!Number.isInteger(blue) || (blue < 0) || (blue > 255)){
//         return undefined; // Blue value is invalid
//     }
//     return "#" +
//         ("0" + red.toString(16).toUpperCase()).slice(-2) +
//         ("0" + green.toString(16).toUpperCase()).slice(-2) +
//         ("0" + blue.toString(16).toUpperCase()).slice(-2);
// }
// Your tests will be supplied with a function named 'rgbToHexColor()', which takes three arguments. It should meet the following requirements:
// Take three integer numbers, representing the red, green, and blue values of RGB color, each within the range [0…255]
// Return the same color in hexadecimal format as a string (e.g. '#FF9EAA')
// Return undefined if any of the input parameters are of an invalid type or not in the expected range


import { expect } from "chai";
import { rgbToHexColor } from "./rgbToHex.js"

describe('rgbToHexColor function', () => {
    it('should return the hexadecimal color for valid RGB values', () => {
        expect(rgbToHexColor(255, 99, 71)).to.equal('#FF6347');
        expect(rgbToHexColor(0, 128, 0)).to.equal('#008000');
        expect(rgbToHexColor(0, 0, 255)).to.equal('#0000FF');
    });

    it('should return undefined for negative RGB values', () => {

        expect(rgbToHexColor(-1, 128, 255)).to.be.undefined;
        expect(rgbToHexColor(0, -1, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 128, -1)).to.be.undefined;
    })
    it("should return undefined for RGB values greater than 255", () => {
        expect(rgbToHexColor(256, 128, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 256, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 128, 256)).to.be.undefined;
    })
    it("should return undefined for non-integer RGB values", () => {
        expect(rgbToHexColor(0.5, 128, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 128.5, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 128, 255.5)).to.be.undefined;
    })

    it("should return undefined for not a number RGB values", () => {
        expect(rgbToHexColor('red', 128, 255)).to.be.undefined;
        expect(rgbToHexColor(0, 'green', 255)).to.be.undefined;
        expect(rgbToHexColor(0, 128, 'blue')).to.be.undefined;

    })
});
