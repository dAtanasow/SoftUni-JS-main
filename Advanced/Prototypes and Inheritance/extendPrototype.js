// Write a function that receives a class and attaches to it a property species with the value "Human" and a function toSpeciesString(). When called, the function returns a string with the format:
// "I am a <species>. <toString()>"
// The function toString() is called from the current instance (call using this).
// Input / Output
// Your function will receive a class whose prototype it should extend. There is NO output, your function should only attach the properties to the given class’ prototype.


function extendPrototype(classToExtend) {

    classToExtend.prototype.species = 'Human'
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`
    }
}