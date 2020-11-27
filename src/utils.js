import {Game, GameResults, values} from './constants'

export const calculateScore = (deck) => {
    let hasAce = false;
    let score = 0;
    for (let i = 0; i < deck.length; i++) {
        let index = values.indexOf(deck[i].value);
        if (index == 0) {
            hasAce = true;
        }
        if (index >= 10) {
            score += 10;
        } else {
            score += index + 1;
        }
    }
    if (score <= 12 && hasAce) {
        score += 10;
    }
    return score;
}

export const checkWinner = (playerScore, dealerScore, gameState) => {
    if(playerScore < 21 && dealerScore < 21){
        return GameResults.NO_WINNER;
    }else{
        if (playerScore == 21 && dealerScore == 21) {
            return GameResults.TIE
        }
        else if (playerScore == 21){
            return GameResults.PLAYER_WINS
        }else if(dealerScore == 21){
            return GameResults.DEALER_WINS;
        }
        else if(playerScore > 21){
            return GameResults.DEALER_WINS;
        }else if(dealerScore > 21){
            return GameResults.PLAYER_WINS
        }
    }
}



