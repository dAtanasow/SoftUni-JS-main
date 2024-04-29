// Write a function that returns an array of Person objects. Use the class from the previous task, create the following instances, and return them in an array:

// First Name Last Name Age Email

// Anna Simpson 22 anna@yahoo.com

// SoftUni

// Stephan Johnson 25

// Gabriel Peterson 24 g.p@gmail.com

// For any empty cells, do not supply a parameter (call the constructor with fewer parameters).

// Input / Output

// There will be no input, the data is static and matches the table above. As output, return an array with Person instances.

// Submit a function that returns the required output.

class Person {
    firstName;
    lastName;
    age;
    email;
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.email = email
    }

    toString() {
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`
    }

}
function createPerson() {
    let persons = [
        new Person('Anna', 'Simpson', 22, 'anna@yahoo.com'),
        new Person('SoftUni'),
        new Person("Stephan", "Johnson", 25),
        new Person("Gabriel", "Peterson", 24, "g.p@gmail.com")
    ]
    return persons;
}
