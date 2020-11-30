import {Game, GameResults, values} from '../constants/gameConstants'

/**
 * Function that takes in a "hand" of cards and calculates the score
 */
export const calculateScore = (hand) => {
    // Boolean variable to check if there are any aces
    let hasAce = false;
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        let index = values.indexOf(hand[i].value);
        if (index === 0) {
            hasAce = true;
        }
        if (index >= 10) {
            score += 10;
        } else {
            score += index + 1;
        }
    }
    // If the score is less than 12 and there is an Ace convert one Ace's value to 11 from 1 (add 10)
    if (score < 12 && hasAce) {
        score += 10;
    }
    return score;
}

/**
 * Function used to check if there is a winner
 */
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

/**
 * Helper function to find the winner. The rules boil down to whomever gets 21 or is closest to 21 wins.
 * If a player's score goes above 21 they lose.
 */
const checkWinner = (playerScore, dealerScore) => {
    if (playerScore === 21 && dealerScore === 21) {
        return GameResults.TIE
    }
    if (playerScore === 21) {
        return GameResults.PLAYER_WINS
    }
    if (dealerScore === 21) {
        return GameResults.DEALER_WINS;
    }
    if (playerScore > 21) {
        return GameResults.DEALER_WINS;
    }
    if (dealerScore > 21) {
        return GameResults.PLAYER_WINS
    }
    // Neither player or dealer have gone past 21 or got 21, so now we have to compare values
    if (playerScore > dealerScore) {
        return GameResults.PLAYER_WINS
    }
    if (dealerScore > playerScore){
        return GameResults.DEALER_WINS;
    }else{
        return GameResults.TIE;
    }
}



