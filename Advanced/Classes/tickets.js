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

function getTickets(arr) {
    let list = []
    for (let ticket of arr) {
        let [destination, price, status] = ticket.split("|")
        list.push(new Ticket(destination, price, status))
    }

   return list
}

console.log(getTickets(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],))