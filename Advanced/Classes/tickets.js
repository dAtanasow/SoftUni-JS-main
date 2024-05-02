// Write a program that manages a database of tickets. A ticket has a destination, a price, and a status. Your program will receive two arguments - the first is an array of strings for ticket descriptions and the second is a string, representing a sorting criterion. The ticket descriptions have the following format:
// <destinationName>|<price>|<status>
// Store each ticket and at the end of execution return a sorted summary of all tickets, sorted by either destination, price, or status, depending on the second parameter that your program received. Always sort in ascending order (the default behavior for alphabetical sort). If two tickets compare the same, use order of appearance. See the examples for more information.
// Input
// Your program will receive two parameters - an array of strings and a single string.
// Output
// Return a sorted array of all the tickets that were registered.


function getTickets(arr, sortCriteria) {

    class Ticket {
        destination;
        price;
        status;
    
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let list = []
    for (let ticket of arr) {
        let [destination, price, status] = ticket.split("|")
        list.push(new Ticket(destination, Number(price), status))
    }

    if (sortCriteria === 'price') {
        list.sort((a, b) => a[sortCriteria] - b[sortCriteria])
    } else {
        list.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]))
    }

    return list
}

console.log(getTickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'], 'status'))