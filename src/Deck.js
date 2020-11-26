let suits = ['S', 'H', 'D', 'C'];
let values = ['A','0','1','2','3','4','5','6','7','8','9','T','J','K','Q'];

class Deck {
    createDeck = () => {
        let deck = [];
        for(let i =0; i<suits.length;i++){
            for(let j =0; j<values.length;j++){
                let card = suits[i] + values[j];
                deck.push(card);
            }
        }
        return deck;
    }
}
