

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