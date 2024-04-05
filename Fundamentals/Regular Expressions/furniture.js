// Write a function to calculate the total cost of different types of furniture. You will be given some lines of input until
// you receive the line "Purchase". For the line to be valid it should be in the following format:
// ">>{furniture name}<<{price}!{quantity}"
// The price can be a floating-point number or a whole number. Furniture items must start with a capital letter. Store
// the names of the furniture and the total price. At the end print each bought furniture on a separate line in the
// format:
// "Bought furniture:
// {1st name}
// {2nd name}
// …"
// And on the last line print, the following: "Total money spend: {spend money}" formatted to the second
// decimal point.
// If there are not valid furniture print only:
// Bought furniture:
// Total money spend: {spend money}


function furniture(arr) {
    let items = []
    let moneySpend = 0
    let pattern = />>(?<name>[A-Z][A-Za-z]+)<<(?<price>\d+\.?\d*)!(?<qty>\d+)/;
    let command = arr.shift();

    while(command != 'Purchase') {
        let match = command.match(pattern)
        if(match) {
            let name = match.groups.name;
            let price = Number(match.groups.price);
            let qty = Number(match.groups.qty)

            let totalPrice = price * qty

            items.push(name)
            moneySpend += totalPrice
        }

        command = arr.shift()
    }

    console.log('Bought furniture:');

    if (items.length > 0) {
        console.log(items.join('\n'));
    }

    console.log(`Total money spend: ${moneySpend.toFixed(2)}`);
}

furniture(['>>Sofa<<312.23!3',
'>>TV<<300!5',
'>Invalid<<!5',
'Purchase'])
furniture(['>>Laptop<<312.2323!3',
'>>TV<<300.21314!5',
'>Invalid<<!5',
'>>TV<<300.21314!20',
'>>Invalid<!5',
'>>TV<<30.21314!5',
'>>Invalid<<!!5',
'Purchase']
)
