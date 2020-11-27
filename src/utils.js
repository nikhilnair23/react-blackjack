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

//TODO: Fix logic when player chooses to stay
export const checkScores = (playerScore, dealerScore, gameState) => {
    if (gameState === Game.END) {
        return checkWinner(playerScore, dealerScore);
    } else {
        if (playerScore < 21 && dealerScore < 21) {
            return GameResults.NO_WINNER;
        }
        return checkWinner(playerScore, dealerScore);
    }
}

//Helper function to find out who the winner is
const checkWinner = (playerScore, dealerScore) => {
    if (playerScore == 21 && dealerScore == 21) {
        return GameResults.TIE
    }
    if (playerScore == 21) {
        return GameResults.PLAYER_WINS
    }
    if (dealerScore == 21) {
        return GameResults.DEALER_WINS;
    }
    if (playerScore > 21) {
        return GameResults.DEALER_WINS;
    }
    if (dealerScore > 21) {
        return GameResults.PLAYER_WINS
    }
    if (playerScore > dealerScore) {
        return GameResults.PLAYER_WINS
    }
    if (dealerScore > playerScore){
        return GameResults.DEALER_WINS;
    }else{
        return GameResults.TIE;
    }
}



