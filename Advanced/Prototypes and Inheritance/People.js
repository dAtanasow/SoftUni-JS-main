// Define several classes, that represent a company’s employee records. Every employee has a name and age, a salary, and a list of tasks, while every position has specific properties not present in the others. Place all common functionality in a parent abstract class. Follow the diagram below:
 
// Every position has different tasks. In addition to all common properties, the manager position has a dividend he can collect along with his salary.
// All employees have a work() function that when called cycles through the list of responsibilities for that position and prints the current one. When all tasks have been printed, the list starts over from the beginning. Employees can also collect salary, which outputs the amount, plus any bonuses.
// Your program needs to expose a module, containing the three classes Employee, Junior, Senior, and Manager. The property's name and age are set through the constructor, while the salary and a manager’s dividend are initially set to zero and can be changed later. The list of tasks is filled by each position. The resulting objects also expose the functions work() and collectSalary(). When work() is called, one of the following lines is printed on the console, depending on the current task in the list:
// "{employee name} is working on a simple task."
// "{employee name} is working on a complicated task."
// "{employee name} is taking time off work."
// "{employee name} is supervising junior workers."
// "{employee name} scheduled a meeting."
// "{employee name} is preparing a quarterly report."
// And when collectSalary() is called, print the following:
// "{employee name} received {salary + bonuses} this month."
// Input / Output
// Any input will be passed as valid arguments, where applicable. Print any output that is required to the console as a string.
// Submit your code as a revealing module, containing the four classes. Any definitions need to be named exactly as described above.


function solution() {
    class Employee {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        };
        work() {
            let currentWork = this.tasks.shift();
            this.tasks.push(currentWork)
            console.log(currentWork);
        };
        collectSalary() {
            let totalSalary = this.salary
            if (this.dividend) {
               totalSalary = this.salary + this.dividend;
            }
            console.log(`${this.name} received ${totalSalary} this month.`)
        };
    };

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.salary = 0;
            this.tasks = [`${this.name} is working on a simple task.`]
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.salary = 0;
            this.tasks = [
                `${this.name} is working on a complicated task.`,
                `${this.name} is taking time off work.`,
                `${this.name} is supervising junior workers.`
            ];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.salary = 0;
            this.tasks = [
                `${this.name} scheduled a meeting.`,
                `${this.name} is preparing a quarterly report.`                
            ];
            this.dividend = 0;
        }
    }

    return { Employee, Junior, Senior, Manager };
}

const classes = solution();
const junior = new classes.Junior('Ivan', 25);

junior.work();
junior.work();

junior.salary = 5811;
junior.collectSalary();

const sinior = new classes.Senior('Alex', 31);

sinior.work();
sinior.work();
sinior.work();
sinior.work();

sinior.salary = 12050;
sinior.collectSalary();

const manager = new classes.Manager('Tom', 55);

manager.salary = 15000;
manager.collectSalary();
manager.dividend = 2500;
manager.collectSalary();



