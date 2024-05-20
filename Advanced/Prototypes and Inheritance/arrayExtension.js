// Extend the built-in Array object with additional functionality. Implement the following functionality:
// ⦁	last() - returns the last element of the array
// ⦁	skip(n) - returns a new array which includes all original elements, except the first n elements; n is a Number parameter
// ⦁	take(n) - returns a new array containing the first n elements from the original array; n is a Number parameter
// ⦁	sum() - returns a sum of all array elements
// ⦁	average() - returns the average of all array elements

(function arrayExtension() {
    Array.prototype.last = function () {
        return this[this.length - 1]
    }
    Array.prototype.skip = function (n) {
        let res = []
        for (let i = n; i < this.length; i++) {
            res.push(this[i])
        }
        return res;
    }
    Array.prototype.take = function (n) {
        let res = []
        for (let i = 0; i < n; i++) {
            res.push(this[i])
        }
        return res;
    }
    Array.prototype.sum = function () {
        let sum = 0
        for (let i = 0; i < this.length; i++) {
            sum += this[i]
        }
        return sum;
    }
    Array.prototype.average = function () {
        return this.sum() / this.length
    }
})()
