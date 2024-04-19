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
            myFace: face,
            mySuit: cards.suits[suit]
        }

        if (!cards.faces.includes(face)) {

            console.error(`Invalid card: ${currentCard}`);
            return;
        }
        deck.push(card.myFace + card.mySuit);
    }
    console.log(deck.join(' '));

}

createCard(['AS', '10D', 'KH', '2C']);
createCard(['5S', '3D', 'QD', '1C']);

