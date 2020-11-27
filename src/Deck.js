import {suits, values} from './constants'

// TODO: Add method to draw card
export default class Deck {

    static createDeck = () => {
        let deck = [];
        for(let i =0; i<suits.length;i++){
            for(let j =0; j<values.length;j++){
                let card = {suit: suits[i], value: values[j]};
                deck.push(card);
            }
        }
        return deck;
    }

    // Knuth Shuffle
    static shuffle = (deck) => {
        let currentIndex = deck.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle
        while (0 !== currentIndex) {

            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }

        return deck;
    }
}
