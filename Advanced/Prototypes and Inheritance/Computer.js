// You need to implement the class hierarchy for a computer business, here are the classes you should create and support:
// ⦁	Keyboard  class that contains:
// ⦁	manufacturer - string property for the name of the manufacturer
// ⦁	responseTime - number property for the response time of the Keyboard
// ⦁	Monitor class that contains:
// ⦁	manufacturer - string property for the name of the manufacturer
// ⦁	width - number property for the width of the screen
// ⦁	height - number property for the height of the screen
// ⦁	Battery class that contains:
// ⦁	manufacturer - string property for the name of the manufacturer
// ⦁	expectedLife - number property for the expected years of the life of the battery
// ⦁	Computer – an abstract class that contains:
// ⦁	manufacturer - string property for the name of the manufacturer
// ⦁	processorSpeed - a number property containing the speed of the processor in GHz
// ⦁	ram - a number property containing the RAM of the computer in Gigabytes
// ⦁	hardDiskSpace - a number property containing the hard disk space in Terabytes
// ⦁	Laptop - class extending the Computer class that contains:
// ⦁	weight - a number property containing the weight of the Laptop in Kilograms
// ⦁	color - a string property containing the color of the Laptop
// ⦁	battery - an instance of the Battery class containing the laptop's battery. There should be a getter and a setter for the property and validation that the passed-in argument is an instance of the Battery class.
// ⦁	Desktop - concrete class extending the Computer class that contains:
// ⦁	keyboard - an instance of the Keyboard class containing the Desktop PC's Keyboard. There should be a getter and a setter for the property and validation that the passed-in argument is an instance of the Keyboard class.
// ⦁	monitor - an instance of the Monitor class containing the Desktop PC's Monitor. There should be a getter and a setter for the property and validation that the passed-in argument is an instance of the Monitor class.
// Attempting to instantiate an abstract class should throw an Error, attempting to pass an object that is not of the expected instance (ex. an object that is not an instance of Battery to the laptop as a battery) should throw a TypeError.

function createComputerHierarchy() {

    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = weight;
            this.color = color;
            this.battery = battery
        }
        set battery(value) {
            this._battery = value
        }
        get battery() {
            return this._battery
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        set keyboard(value) {
            this._keyboard = value;
        }
        set monitor(value) {
            this._monitor = value;
        }
        get keyboard() {
            return this._keyboard;
        }
        get monitor() {
            return this._monitor;
        }

    }
    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }

}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
console.log(laptop);