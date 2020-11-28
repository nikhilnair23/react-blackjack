import {suits, values} from '../constants/gameConstants'


export default class Deck {

    constructor() {
        this.deck = []
    }

    createDeck() {
        this.deck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                let card = {suit: suits[i], value: values[j]};
                this.deck.push(card);
            }
        }
        return this.deck;
    }

    // Knuth Shuffle
    shuffle() {
        let currentIndex = this.deck.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle
        while (0 !== currentIndex) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }

        return this.deck;
    }

    drawCard = () => {
        return this.deck.pop();
    }

    getDeck() {
        return this.deck;
    }
}
