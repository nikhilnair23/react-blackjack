let suits = ['S', 'H', 'D', 'C'];
let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

export default class Deck {

    static createDeck = () => {
        let deck = [];
        for(let i =0; i<suits.length;i++){
            for(let j =0; j<values.length;j++){
                //let card = suits[i] + values[j];
                let card = {suit: suits[i], value: values[j]};
                deck.push(card);
            }
        }
        console.log(deck);
        return deck;
    }
}
