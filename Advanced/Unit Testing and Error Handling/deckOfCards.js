// Write a function that takes a deck of cards as an array of strings and prints them as a sequence of cards (space separated). Use the solution from the previous task to generate the cards. 
// Print `Invalid card: ${card}` when an invalid card definition is passed as input. 
// Input / Output
// The function takes an array of strings as a parameter. Print the list of cards as string, separated by space.


function createCard(arr) {

    const cards = {
        faces: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        suits: {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663 '
        }
    }
    let deck = []
    for (let currentCard of arr) {
        let array = currentCard.split('')
        let suit = array.pop();
        let face = array.join('')
        const card = {
            face: face,
            suit: cards.suits[suit]
        }

        if (!cards.faces.includes(face)) {

            console.error(`Invalid card: ${currentCard}`);
            return;
        }
        deck.push(card.face + card.suit);
    }
    console.log(deck.join(' '));

}

createCard(['AS', '10D', 'KH', '2C']);
createCard(['5S', '3D', 'QD', '1C']);

